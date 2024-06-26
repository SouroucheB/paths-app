export const useSortedSkills = ({
  requiredSkills,
  missingSkills,
}: {
  requiredSkills: string[];
  missingSkills: string[];
}) =>
  requiredSkills.slice().sort((a, b) => {
    const aIsMissing = missingSkills.includes(a);
    const bIsMissing = missingSkills.includes(b);

    if (aIsMissing && !bIsMissing) {
      return 1;
    } else if (!aIsMissing && bIsMissing) {
      return -1;
    } else {
      return a.localeCompare(b);
    }
  });
