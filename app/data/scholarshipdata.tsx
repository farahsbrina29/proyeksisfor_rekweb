// Scholarship data and utilities
const months: { [key: string]: number } = {
  Januari: 0,
  Februari: 1,
  Maret: 2,
  April: 3,
  Mei: 4,
  Juni: 5,
  Juli: 6,
  Agustus: 7,
  September: 8,
  Oktober: 9,
  November: 10,
  Desember: 11,
};

// Function to parse custom date
export function parseCustomDate(dateString: string): Date {
  const [day, month, year] = dateString.split(" ");
  return new Date(Number(year), months[month], parseInt(day, 10));
}

export function getScholarshipStatus(startDate: string, endDate: string): string {
  const today = new Date();
  const start = parseCustomDate(startDate);
  const end = parseCustomDate(endDate);

  return today >= start && today <= end ? "Active" : "Inactive";
}

// Scholarship data
export const scholarships = [
  {
    id: 1,
    title: "Telkom University S1 Scholarship",
    startDate: "20 November 2024",
    endDate: "12 Desember 2024",
    tags: ["Academic"],
  },
  {
    id: 2,
    title: "Telkom University D3 Scholarship",
    startDate: "1 November 2024",
    endDate: "18 November 2024",
    tags: ["Non Academic"],
  },
  {
    id: 3,
    title: "Government Bursary Program",
    startDate: "15 November 2024",
    endDate: "30 November 2024",
    tags: ["Bursary"],
  },
  {
    id: 4,
    title: "Science Research Grant",
    startDate: "10 Oktober 2024",
    endDate: "30 November 2024",
    tags: ["Research", "Academic"],
  },
  {
    id: 5,
    title: "Sports Excellence Scholarship",
    startDate: "5 September 2024",
    endDate: "25 November 2024",
    tags: ["Sports", "Non Academic"],
  },
  {
    id: 6,
    title: "Arts and Culture Award",
    startDate: "1 November 2024",
    endDate: "20 Desember 2024",
    tags: ["Arts", "Academic"],
  },
  {
    id: 7,
    title: "Community Leadership Scholarship",
    startDate: "10 November 2024",
    endDate: "30 Desember 2024",
    tags: ["Leadership", "Academic"],
  },
  {
    id: 8,
    title: "Engineering Innovation Grant",
    startDate: "15 Oktober 2024",
    endDate: "25 November 2024",
    tags: ["Innovation", "Research"],
  },
  {
    id: 9,
    title: "Healthcare Professionals Grant",
    startDate: "1 November 2024",
    endDate: "30 November 2024",
    tags: ["Healthcare", "Bursary"],
  },
  {
    id: 10,
    title: "Entrepreneurship Excellence Award",
    startDate: "20 Oktober 2024",
    endDate: "30 November 2024",
    tags: ["Entrepreneurship", "Non Academic"],
  },
];
