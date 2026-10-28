<# : 2>nul
@echo off
setlocal
cd /d "%~dp0"
title Codebase Exporter

echo ========================================================
echo               Codebase Exporter (.bat)
echo ========================================================
echo.
echo Scanning project directory and exporting code files...
echo Please wait...
echo.

set "SCRIPT_FILE=%~f0"
set "PROJECT_ROOT=%~dp0"

powershell -NoProfile -ExecutionPolicy Bypass -Command "$env:SCRIPT_FILE='%SCRIPT_FILE%'; $env:PROJECT_ROOT='%PROJECT_ROOT%'; Invoke-Expression ([System.IO.File]::ReadAllText('%SCRIPT_FILE%'))"
set "EXIT_CODE=%errorlevel%"

echo.
if %EXIT_CODE% equ 0 (
    echo [SUCCESS] Code dump generated successfully!
) else (
    echo [ERROR] An error occurred during export.
)
echo.
echo Press any key to exit...
pause >nul
exit /b %EXIT_CODE%
#>

# ------------------------------------------------------------------------------
# PowerShell Code Exporter Engine
# ------------------------------------------------------------------------------
$projectRoot = $env:PROJECT_ROOT.TrimEnd('\', '/')
$scriptFile  = $env:SCRIPT_FILE
$outputName  = "codebase_dump.txt"
$outputPath  = Join-Path $projectRoot $outputName

# Allowed Code & Text File Extensions
$codeExtensions = @(
    # Web & JavaScript / TypeScript
    '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.vue', '.svelte', '.astro',
    # Styling & Markup
    '.css', '.scss', '.sass', '.less', '.styl', '.postcss', '.html', '.htm',
    # Data & Configuration
    '.json', '.jsonc', '.json5', '.yaml', '.yml', '.toml', '.xml', '.ini',
    # Documentation & Text
    '.md', '.mdx', '.txt', '.rst',
    # Shell & Scripting
    '.sh', '.bash', '.zsh', '.ps1',
    # Backend & Programming Languages
    '.py', '.java', '.kt', '.kts', '.scala',
    '.c', '.cpp', '.cc', '.cxx', '.h', '.hpp', '.cs',
    '.go', '.rs', '.php', '.rb', '.dart', '.swift',
    # Database & Query
    '.sql', '.prisma', '.graphql', '.gql'
)

# Special filenames to include (even without standard extensions)
$specialFiles = @(
    '.gitignore', '.gitattributes', '.editorconfig',
    'Dockerfile', 'Makefile', 'Procfile',
    '.oxlintrc.json', '.prettierrc', '.eslintrc'
)

# Directories to skip entirely (avoid traversing into node_modules, build outputs, etc.)
$excludeDirs = @(
    'node_modules', '.git', '.svn', '.hg',
    'dist', 'build', 'out', '.next', '.nuxt', '.turbo', '.cache', 'coverage', '.parcel-cache',
    '.vscode', '.idea'
)

# Explicit file names to skip (node lockfiles, output file, etc.)
$excludeFiles = @(
    'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'bun.lockb',
    $outputName, (Split-Path -Leaf $scriptFile)
)

# Explicit file extensions to skip (images, pdfs, media, archives, binaries)
$excludeExts = @(
    # Images & Vector
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.bmp', '.tiff', '.tif', '.avif', '.psd', '.ai',
    # Documents & PDF
    '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
    # Audio / Video
    '.mp4', '.mp3', '.wav', '.mov', '.avi', '.mkv', '.flac', '.webm', '.ogg', '.m4a',
    # Fonts
    '.woff', '.woff2', '.ttf', '.otf', '.eot',
    # Archives & Compressed
    '.zip', '.tar', '.gz', '.tgz', '.7z', '.rar', '.bz2', '.iso',
    # Binaries & Executables
    '.exe', '.dll', '.bin', '.so', '.dylib', '.class', '.pyc', '.obj', '.o',
    # Scripts/Bat
    '.bat', '.cmd'
)

function Should-IncludeFile($file) {
    $fileName = $file.Name
    $ext = $file.Extension.ToLower()

    # 1. Skip exact file names (lockfiles, self, dump output)
    if ($excludeFiles -contains $fileName) { return $false }

    # 2. Skip environment files (.env, .env.local, .env.production, etc.)
    if ($fileName -like '.env*' -or $fileName -like '*.env') { return $false }

    # 3. Skip excluded extensions (images, pdf, binaries)
    if ($excludeExts -contains $ext) { return $false }

    # 4. Check if special file
    if ($specialFiles -contains $fileName -or $fileName -like '.prettierrc*' -or $fileName -like '.eslintrc*') {
        return $true
    }

    # 5. Check if allowed code extension
    if ($codeExtensions -contains $ext) {
        return $true
    }

    return $false
}

function Get-AllCodeFiles($dir) {
    foreach ($item in Get-ChildItem -LiteralPath $dir -Force) {
        if ($item.PSIsContainer) {
            # Skip excluded directories
            if ($excludeDirs -notcontains $item.Name) {
                Get-AllCodeFiles $item.FullName
            }
        } else {
            if (Should-IncludeFile $item) {
                $item
            }
        }
    }
}

try {
    $codeFiles = @(Get-AllCodeFiles $projectRoot)
    $totalCount = $codeFiles.Count

    Write-Host "Found $totalCount code files to export." -ForegroundColor Cyan

    $utf8NoBom = [System.Text.UTF8Encoding]::new($false)
    $writer = New-Object System.IO.StreamWriter($outputPath, $false, $utf8NoBom)

    # Header summary
    $writer.WriteLine("=" * 80)
    $writer.WriteLine("PROJECT CODEBASE EXPORT")
    $writer.WriteLine("Generated on : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
    $writer.WriteLine("Project Root : $projectRoot")
    $writer.WriteLine("Total Files  : $totalCount")
    $writer.WriteLine("=" * 80)
    $writer.WriteLine()

    $index = 0
    foreach ($file in $codeFiles) {
        $index++
        $relPath = $file.FullName.Substring($projectRoot.Length).TrimStart('\', '/')
        # Normalize to forward slashes for clean presentation
        $normalizedRelPath = $relPath.Replace('\', '/')

        Write-Host "[$index/$totalCount] Adding: $normalizedRelPath"

        $writer.WriteLine("=" * 80)
        $writer.WriteLine("FILE: $normalizedRelPath")
        $writer.WriteLine("=" * 80)

        try {
            $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
            $writer.WriteLine($content)
        } catch {
            $writer.WriteLine("[WARNING: Could not read file content - $($_.Exception.Message)]")
            Write-Warning "Failed reading $normalizedRelPath : $($_.Exception.Message)"
        }

        $writer.WriteLine()
        $writer.WriteLine()
    }

    $writer.WriteLine("=" * 80)
    $writer.WriteLine("END OF CODEBASE EXPORT ($totalCount files)")
    $writer.WriteLine("=" * 80)

    $writer.Close()

    $outputFileInfo = Get-Item -LiteralPath $outputPath
    $sizeKb = [Math]::Round($outputFileInfo.Length / 1KB, 2)
    Write-Host ""
    Write-Host "Successfully generated: $outputName ($sizeKb KB)" -ForegroundColor Green
    exit 0
} catch {
    Write-Error "Failed to export codebase: $_"
    if ($null -ne $writer) {
        $writer.Close()
    }
    exit 1
}
