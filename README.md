# FileSure – CIN & LLPIN Checker

A simple and user-friendly web application designed to validate the format of Indian Company Identification Numbers (CIN) and Limited Liability Partnership Identification Numbers (LLPIN).

## Live Website

https://filesure-cin-checker-beryl.vercel.app/

## GitHub Repository

https://github.com/neomadabre1110/filesure-cin-checker

## Project Overview

FileSure CIN & LLPIN Checker allows users to enter one or multiple identification numbers and check whether they follow the expected format.

The application provides validation results with explanations for incorrectly formatted entries.

## Features

- CIN format validation
- LLPIN format validation
- Multiple entries supported
- Supports up to 500 entries per check
- Automatic uppercase conversion
- Removes unnecessary spaces around entries
- Displays valid and invalid results
- Shows summary counts for total, valid, invalid, companies and LLPs
- Provides error messages for invalid formats
- Clear button to reset input and results
- Responsive layout for different screen sizes

## Technologies Used

- HTML5 – Website structure
- CSS3 – Styling and responsive layout
- JavaScript – Input processing and validation
- GitHub – Source code management
- Vercel – Website deployment

## Project Structure

```text
filesure-cin-checker/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run Locally

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` in your browser.
4. Enter CIN or LLPIN numbers in the input box.
5. Click the Check Numbers button to view the results.

## Validation Examples

| Identifier | Example |
|---|---|
| CIN | L17110MH1973PLC019786 |
| LLPIN | AAA-1234 |

## Important Note

This application performs format-based validation only. It does not confirm whether a company or LLP is officially registered or active with the Ministry of Corporate Affairs (MCA).

## Author

Neoma Milton Dabre

## Deployment

The application is deployed using Vercel.

Live URL: https://filesure-cin-checker-beryl.vercel.app/
