<?php

header('Content-Type: application/json');
require_once __DIR__ . "/../vendor/autoload.php";

$canteenUrl = "https://www.studentenwerk.uni-heidelberg.de/sites/default/files/download/pdf/sp-mos-mensa-aktuell.pdf";
$tempPdfFile = 'canteen.pdf';

if (file_exists($tempPdfFile) and (time() - filemtime($tempPdfFile)) < 1800) {
    outputCanteen($tempPdfFile);
} else {
    if (file_put_contents($tempPdfFile, file_get_contents($canteenUrl))) {
        outputCanteen($tempPdfFile);
    } else {
        echo "Error parsing PDF";
    }
}

function outputCanteen($tempPdfFile)
{
    $weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
    $parser = new \Smalot\PdfParser\Parser();
    $pdf = $parser->parseFile($tempPdfFile);
    $text = explode("\n", str_replace("\t", "", $pdf->getPages()[0]->getText()));
    $text = array_map(
        function ($line) {
            return preg_replace('!\s+!', ' ', trim($line));
        },
        $text
    );
    $canteenArray = [];

    foreach ($text as $key => &$line) {
        $noSpaceLine = str_replace(" ", "", $line);
        if (in_array($noSpaceLine, $weekdays)) {
            $line = $noSpaceLine;
            $startKey = $key + 1;
            $endKey = checkEndKeyFromStartKey($startKey, $text);
            $canteenArray[$line] = array_slice($text, $startKey, ($endKey - $startKey));
        }
    }

    echo json_encode($canteenArray);
}

function checkEndKeyFromStartKey(int $startKey, array $array): ?int
{
    $endKey = null;
    foreach ($array as $key => $line) {
        if ($key >= $startKey) {
            if (empty($line)) {
                return $key;
            }
        }
    }
    return $endKey;
}