function calculateAccessibilityScore() {
    const relevantTags = [
        'button',
        'a',
        'input',
        'textarea',
        'select',
        'form',
        '[role]',
    ];

    const elements = document.querySelectorAll<HTMLElement>(
        relevantTags.join(','),
    );

    const totalElements = elements.length;
    const missingAria: Array<HTMLElement> = [];

    for (const element of elements) {
        const hasAria = Array.from(element.attributes).some((attr) =>
            attr.name.startsWith('aria-'),
        );
        if (!hasAria) {
            missingAria.push(element);
        }
    }

    const missingCount = missingAria.length;
    const score = 100 * (1 - missingCount / totalElements);

    console.log('Total Relevant Elements:', totalElements);
    console.log('Elements Missing Aria-* Attributes:', missingAria);
    console.log('Accessibility Score (out of 100):', score.toFixed(2));

    if (score >= 90) {
        console.log(
            '%cExcellent Accessibility ✅',
            'color: green; font-weight: bold',
        );
    } else if (score >= 75) {
        console.log(
            '%cGood Accessibility. Minor improvements recommended. 👍',
            'color: orange; font-weight: bold',
        );
    } else if (score >= 50) {
        console.log(
            '%cAverage Accessibility. Needs significant improvement. ⚠️',
            'color: yellow; font-weight: bold',
        );
    } else {
        console.log(
            '%cPoor Accessibility. Major issues detected! ❌',
            'color: red; font-weight: bold',
        );
    }

    return {
        totalElements,
        missingCount,
        score: score.toFixed(2),
        missingAria,
    };
}

calculateAccessibilityScore();
