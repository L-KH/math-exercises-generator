// Level 1: Point M and checking if it belongs to a line (D)
function level1() {
    const a = randInt(-5, 5);
    const b = randInt(-5, 5);
    
    // Create linear equation in the form y = ax + b
    const equation = formatEquation(a, b);
    
    // Generate a point
    const pointX = randInt(-5, 5);
    const pointY = randInt(-5, 5);
    
    // Check if point belongs to the line
    const expected = a * pointX + b;
    const belongs = Math.abs(expected - pointY) < 0.01;
    
    // Generate graph SVG
    const graph = generateGraph(a, b, -10, 10, -10, 10, { x: pointX, y: pointY, belongs });
    
    // Prepare the calculation steps for the answer
    const solutionSteps = `${formatText("Pour vérifier si le point M(")}${pointX}, ${pointY}${formatText(") appartient à la droite (D) d'équation ")}y = ${a}x ${b >= 0 ? '+ ' + b : b < 0 ? '- ' + Math.abs(b) : ''}, ${formatText("nous devons substituer les coordonnées du point dans l'équation:")} \\\\ 
        ${formatText("Substituons x = ")}${pointX}${formatText(" et vérifions si y = ")}${pointY} \\\\ 
        ${formatText("Calcul: ")}${a} \\times ${pointX} ${b >= 0 ? '+ ' + b : b < 0 ? '- ' + Math.abs(b) : ''} = ${a * pointX} ${b >= 0 ? '+ ' + b : b < 0 ? '- ' + Math.abs(b) : ''} = ${a * pointX + b} \\\\ 
        ${formatText("Comme ")}${a * pointX + b} ${belongs ? '= ' : '\\neq '}${pointY}, ${formatText("le point M")}${belongs ? formatText(" appartient à la droite (D).") : formatText(" n'appartient pas à la droite (D).")}`;
    
    return {
        question: `${formatText("Pour la droite (D) d'équation ")}${equation}${formatText(", déterminer si le point M(")}${pointX}, ${pointY}${formatText(") appartient à la droite (D).")}`,
        answer: `${solutionSteps} \\\\${graph}`,
        questionText: `${formatText("Exercice d'appartenance d'un point à une droite:")}`,
        isPointBelongs: belongs
    };
}