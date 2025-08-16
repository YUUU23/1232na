import entries_2025 from "../docs/2025.json";
import entries_2024 from "../docs/2024.json";
import entries_2023 from "../docs/2023.json";
import entries_2022 from "../docs/2022.json";
import entries_2021 from "../docs/2021.json";
let all_entries = {
  2025: entries_2025,
  2024: entries_2024,
  2023: entries_2023,
  2022: entries_2022,
  2021: entries_2021,
};

const lastyear = 2020 + Object.keys(all_entries).length;
const lastentries = all_entries[lastyear];
console.log(lastentries, lastyear, lastentries, all_entries);
const lastentry =
  Object.entries(lastentries)[Object.keys(lastentries).length - 1];
const lastEntryDate = { year: lastyear, month: lastentry[1]["Month"] };
const source = { all_entries, lastEntryDate };
export default source;
