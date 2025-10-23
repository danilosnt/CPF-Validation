# CPF Validation

This repository contains a JavaScript script for validating the **"Cadastro de Pessoa Física" (CPF)**, the individual taxpayer identification number used **exclusively in Brazil**.

The code implements the official check digit calculation algorithm, defined by the **"Receita Federal do Brasil"** (Brazil's federal revenue service), to determine if a CPF number is mathematically valid. It also includes checks for invalid formats and sequences of repeated numbers (like `111.111.111-11`), which are considered invalid.

## What is the CPF?

The "CPF" (Cadastro de Pessoas Físicas) is the registry maintained by the Receita Federal do Brasil, in which all individual taxpayers must enroll once. This number is unique to each individual and is essential for most financial and tax-related transactions within the country.

## Main Features

* **Automatic Cleaning:** Automatically removes non-numeric characters (like `.`, `-`, and spaces) from the submitted CPF.
* **Length Check:** Ensures the CPF contains exactly 11 numeric digits.
* **Sequence Detection:** Rejects CPFs that consist of a sequence of 11 identical digits (e.g., `000.000.000-00`), which are known to be invalid.
* **Algorithm Validation:**
    * Calculates the first check digit based on the first 9 digits of the CPF.
    * Calculates the second check digit based on the first 9 digits plus the first calculated digit.
    * Compares the generated CPF with the submitted CPF to determine its validity.
