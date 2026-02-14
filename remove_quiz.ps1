# Script to remove quiz functionality from app.js
$content = Get-Content "C:\Users\User\OneDrive\Escritorio\blender-tool\js\app.js" -Raw

# Remove the quiz functions block (from "function startQuiz()" to "function showQuizResults()" end)
$pattern = '(?s)function startQuiz\(\).*?^\}\s*$.*?function showQuizResults\(\).*?^\}\s*$'
$content = $content -replace $pattern, ''

# Remove the quiz button event listener line
$content = $content -replace '\s*//\s*Quiz\s*\n\s*elements\.quizBtn\.onclick\s*=\s*startQuiz;\s*\n', ''

# Save the modified content
Set-Content "C:\Users\User\OneDrive\Escritorio\blender-tool\js\app.js" -Value $content

Write-Host "Quiz functions removed from app.js"
