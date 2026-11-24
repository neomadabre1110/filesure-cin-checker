
// ============================================
// FILESURE - CIN AND LLPIN CHECKER
// Updated with Results Dashboard
// ============================================


// 1. CONNECT HTML ELEMENTS

const cinInput = document.getElementById("cinInput");
const checkButton = document.getElementById("checkButton");
const clearButton = document.getElementById("clearButton");
const resultsContainer = document.getElementById("resultsContainer");


// 2. STATE CODES

const stateCodes = {
    AN: "Andaman and Nicobar Islands",
    AP: "Andhra Pradesh",
    AR: "Arunachal Pradesh",
    AS: "Assam",
    BR: "Bihar",
    CH: "Chandigarh",
    CG: "Chhattisgarh",
    DD: "Daman and Diu (legacy code)",
    DL: "Delhi",
    GA: "Goa",
    GJ: "Gujarat",
    HR: "Haryana",
    HP: "Himachal Pradesh",
    JK: "Jammu and Kashmir",
    JH: "Jharkhand",
    KA: "Karnataka",
    KL: "Kerala",
    LA: "Ladakh",
    LD: "Lakshadweep",
    MP: "Madhya Pradesh",
    MH: "Maharashtra",
    MN: "Manipur",
    ML: "Meghalaya",
    MZ: "Mizoram",
    NL: "Nagaland",
    OD: "Odisha",
    OR: "Odisha (legacy code)",
    PB: "Punjab",
    PY: "Puducherry",
    RJ: "Rajasthan",
    SK: "Sikkim",
    TN: "Tamil Nadu",
    TS: "Telangana",
    TR: "Tripura",
    UP: "Uttar Pradesh",
    UT: "Uttarakhand (legacy code)",
    UK: "Uttarakhand",
    WB: "West Bengal"
};


// 3. COMPANY TYPE CODES

const companyTypes = {
    PLC: "Public Limited Company",
    PTC: "Private Limited Company",
    OPC: "One Person Company",
    GOI: "Union Government Company",
    SGC: "State Government Company",
    FLC: "Foreign Public Limited Company",
    FTC: "Foreign Private Limited Company",
    NPL: "Section 8 / Non-profit Company",
    ULL: "Unlimited Liability Public Company",
    ULT: "Unlimited Liability Private Company",
    GAP: "Guarantee and Association Public Company",
    GAT: "Guarantee and Association Private Company"
};


// 4. CHECK CIN

function checkCIN(value) {

    const errors = [];

    if (value.length !== 21) {
        errors.push(
            `CIN must contain exactly 21 characters. You entered ${value.length}.`
        );
    }

    if (!/^[LU]/.test(value)) {
        errors.push(
            "First character must be L (Listed) or U (Unlisted)."
        );
    }

    if (!/^\d{5}$/.test(value.slice(1, 6))) {
        errors.push(
            "Characters 2 to 6 must contain five digits."
        );
    }

    const stateCode = value.slice(6, 8);

    if (!stateCodes[stateCode]) {
        errors.push(
            "Invalid or unrecognized state code: " + stateCode
        );
    }

    const yearText = value.slice(8, 12);
    const year = Number(yearText);

    if (
        !/^\d{4}$/.test(yearText) ||
        year < 1857 ||
        year > new Date().getFullYear()
    ) {
        errors.push(
            "Invalid incorporation year: " + yearText
        );
    }

    const typeCode = value.slice(12, 15);

    if (!/^[A-Z]{3}$/.test(typeCode)) {
        errors.push(
            "Company type must contain three letters."
        );
    }

    const registrationNumber = value.slice(15, 21);

    if (!/^\d{6}$/.test(registrationNumber)) {
        errors.push(
            "Last six characters must contain digits only."
        );
    }

    if (errors.length > 0) {
        return {
            valid: false,
            category: "Company",
            errors: errors
        };
    }

    return {
        valid: true,
        category: "Company",
        listingStatus: value[0] === "L" ? "Listed" : "Unlisted",
        industryCode: value.slice(1, 6),
        state: stateCodes[stateCode],
        year: year,
        typeCode: typeCode,
        companyType:
            companyTypes[typeCode] ||
            "Unrecognized company type code: " + typeCode,
        registrationNumber: registrationNumber
    };
}


// 5. CHECK LLPIN

function checkLLPIN(value) {

    const pattern = /^[A-Z]{3}-\d{4}$/;

    if (!pattern.test(value)) {
        return {
            valid: false,
            category: "LLP",
            errors: [
                "Invalid LLPIN format. Expected three letters, a hyphen and four digits. Example: AAA-1234."
            ]
        };
    }

    return {
        valid: true,
        category: "LLP",
        listingStatus: "Not applicable",
        state: "Not encoded in LLPIN",
        year: "Not encoded in LLPIN",
        companyType: "Limited Liability Partnership",
        registrationNumber: value
    };
}


// 6. CREATE SUMMARY DASHBOARD

function createSummary(stats) {

    const summary = document.createElement("div");

    summary.className = "summary-grid";

    const cards = [
        ["Total Checked", stats.total, "total"],
        ["Valid Formats", stats.valid, "valid"],
        ["Invalid Formats", stats.invalid, "invalid"],
        ["Companies", stats.companies, "company"],
        ["LLPs", stats.llps, "llp"]
    ];

    cards.forEach(function(item) {

        const card = document.createElement("div");

        card.className = "summary-card " + item[2];

        const number = document.createElement("h3");

        number.textContent = item[1];

        const label = document.createElement("p");

        label.textContent = item[0];

        card.appendChild(number);
        card.appendChild(label);

        summary.appendChild(card);

    });

    return summary;
}


// 7. CREATE INDIVIDUAL RESULT CARD

function createResultCard(value, result) {

    const card = document.createElement("div");

    card.className = "result-card";

    const heading = document.createElement("h3");

    heading.textContent = value;

    card.appendChild(heading);


    const status = document.createElement("p");

    status.className = result.valid
        ? "valid-status"
        : "invalid-status";

    status.textContent = result.valid
        ? "Valid format"
        : "Invalid format";

    card.appendChild(status);


    if (result.valid) {

        const details = [
            ["Category", result.category],
            ["Listing Status", result.listingStatus],
            ["State", result.state],
            ["Year of Incorporation", result.year],
            ["Company Type", result.companyType],
            ["Industry Code", result.industryCode || "Not applicable"],
            ["Registration Number", result.registrationNumber]
        ];

        details.forEach(function(item) {

            const row = document.createElement("p");

            row.textContent = item[0] + ": " + item[1];

            card.appendChild(row);

        });

    } else {

        const errorHeading = document.createElement("p");

        errorHeading.textContent = "What went wrong:";

        card.appendChild(errorHeading);

        result.errors.forEach(function(error) {

            const errorRow = document.createElement("p");

            errorRow.textContent = "• " + error;

            card.appendChild(errorRow);

        });

    }

    return card;
}


// 8. MAIN CHECK BUTTON

checkButton.addEventListener("click", function() {

    resultsContainer.replaceChildren();

    const values = cinInput.value
        .split(/\r?\n/)
        .map(function(value) {
            return value.trim().toUpperCase();
        })
        .filter(function(value) {
            return value.length > 0;
        });


    // Empty input check

    if (values.length === 0) {

        resultsContainer.textContent =
            "Please enter at least one CIN or LLPIN.";

        return;
    }


    // Maximum 500 entries

    if (values.length > 500) {

        resultsContainer.textContent =
            "Maximum 500 entries allowed. Please reduce your input.";

        return;
    }


    // Prepare summary counts

    const stats = {
        total: values.length,
        valid: 0,
        invalid: 0,
        companies: 0,
        llps: 0
    };


    // Use a document fragment for efficient rendering

    const output = document.createDocumentFragment();


    // Process each number

    values.forEach(function(value) {

        let result;

        // Identify the input type

        if (/^[A-Z]{3}-/.test(value) ||
            /^[A-Z]{3}\d/.test(value)) {

            result = checkLLPIN(value);

        } else {

            result = checkCIN(value);

        }


        // Update summary counts

        if (result.valid) {
            stats.valid++;
        } else {
            stats.invalid++;
        }

        if (result.category === "Company") {
            stats.companies++;
        }

        if (result.category === "LLP") {
            stats.llps++;
        }


        // Add individual result

        output.appendChild(
            createResultCard(value, result)
        );

    });


    // Display dashboard before individual results

    resultsContainer.appendChild(
        createSummary(stats)
    );

    resultsContainer.appendChild(output);

});


// 9. CLEAR BUTTON

clearButton.addEventListener("click", function() {

    cinInput.value = "";

    resultsContainer.replaceChildren();

    resultsContainer.textContent =
        "Your results will appear here.";

});


// ============================================
// END OF FILESURE CHECKER
// ============================================
