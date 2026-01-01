const citesName = [
  "Ramallah",
  "Gaza",
  "Hebron",
  "Nablus",
  "Bethlehem",
  "Jericho",
  "Tulkarm",
  "Qalqilya",
  "Jenin",
  "Jerusalem",
];

const displayCitesName = () => {
  const cites = citesName.map((city, index) => {
    return `
           <option value="${city}" ${index === 0 ? "selected" : ""}>${city}</option>
        `;
  });

  document.querySelector(".form-select").innerHTML = cites;
};

displayCitesName();

document.querySelector(".form-select").addEventListener("change", async (e) => {
  try {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity/01-01-2026?city=${e.target.value}&country=Palestine&method=2`
    );

    document.querySelector(".cityName").textContent = e.target.value;
    document.querySelector(".ourDate").textContent =
      response.data.data.date.readable;

    const TimeAndCitesName = Object.entries(response.data.data.timings);

    const res = TimeAndCitesName.map((curr) => {
      return `
        <div class="col-xxl-4 col-lg-6 col-md-6 col-12">
            <div class="card shadow-sm border-0 rounded-4 p-3 text-center">
                <h3 class="text-primary text-capitalize mb-2">${curr[0]}</h3>
                <p class="display-6 fw-bold mb-0">${curr[1]}</p>
            </div>
        </div>
      `;
    }).join("");

    document.querySelector(".timePrays .container .row").innerHTML = res;
  } catch (error) {
    alert("Try again later...");
  }
});
