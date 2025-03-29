// home page

function addAnimationClasses() {
    const welcomeMessage = document.querySelector('.welcome-message');
    const einsteinImage = document.querySelector('.einstein-img');

    
    setTimeout(() => {
        welcomeMessage.classList.add('fade-in');
        einsteinImage.classList.add('fade-in');
    }, 100);
}

//lock





//logout

window.logout = function() {
    localStorage.removeItem('loggedInUser');
    alert('You have been logged out successfully');
    checkAuth();
    
    // Redirect to home page after logout
    window.location.href = 'home.html';
};


// dropdown

document.querySelectorAll('.dropdown-toggle').forEach(item => {
     item.addEventListener('click', event => {
            const dropdownMenu = item.nextElementSibling; 
            const isVisible = dropdownMenu.style.visibility === 'visible';
            dropdownMenu.style.visibility = isVisible ? 'hidden' : 'visible'; 
            dropdownMenu.style.opacity = isVisible ? '0' : '1'; 
            dropdownMenu.style.transform = isVisible ? 'translateY(-10px)' : 'translateY(0)'; 
     });
});


// Inorganic- block 


function searchColor(section) {
    let searchInput = document.getElementById(section + 'Search').value.toLowerCase();
    let resultText = document.getElementById(section + 'ResultText');
    let colorBox = document.getElementById(section + 'ColorBox');
    
    // Define the chemical data
    let data = {
        compounds: [
            { name: "Bromine", color: "#00BFFF", symbol: "Br2", colorName: "Deep Sky Blue" },
            { name: "Iodine", color: "#800080", symbol: "I2", colorName: "Purple" },
            { name: "Nitrogen dioxide", color: "#8B0000", symbol: "NO2", colorName: "Brown" },   
            { name: "Chromium(III) oxide", color: "#4E7F27", symbol: "Cr2O3", colorName: "Dark green" },
            { name: "Ammonium dichromate", color: "#FF8C00", symbol: "(NH4)2Cr2O7", colorName: "Orange" },
            { name: "Chromium(III) hydroxide", color: "#4B9C3A", symbol: "Cr(OH)3", colorName: "Green or grayish-green solid" },
            { name: "Sodium chromite", color: "#4A8C2C", symbol: "NaCro2", colorName: "Green" },
            { name: "Silver oxide", color: "#000000", symbol: "Ag2O", colorName: "Black" },
            { name: "Cadmium Hydroxide", color: "#FFFFFF", symbol: "Cd(OH)2", colorName: "White" },
            { name: "Zinc Hydroxide", color: "#FFFFFF", symbol: "Zn(OH)2", colorName: "White" },
            { name: "Copper(II) Hydroxide", color: "#0072B8", symbol: "Cu(OH)2", colorName: "Blue" },
            { name: "Nickel(II) Hydroxide", color: "#4CAF50", symbol: "Ni(OH)2", colorName: "Green" },
            { name: "Cobalt(II) Hydroxide", color: "#D44A6D", symbol: "Co(OH)2", colorName: "Pink" },
            { name: "Silver chloride", color: "#FFFFFF", symbol: "AgCl", colorName: "White" },
            { name: "Silver bromide", color: "#E4D6B5", symbol: "AgBr", colorName: "Light yellow" },
            { name: "Silver iodide", color: "#FFC300", symbol: "AgI", colorName: "Dark yellow" },
            { name: "Lead(II) chloride", color: "#FFFFFF", symbol: "PbCl2", colorName: "White" },
            { name: "Lead(II) bromide", color: "#FFD700", symbol: "PbBr2", colorName: "Yellow" },
            { name: "Lead(II) iodide", color: "#FFFF00", symbol: "PbI2", colorName: "Light Yellow" },
            { name: "Chromyl chloride", color: "#7E4B3A", symbol: "CrO2Cl2", colorName: "Red-brown" },
            { name: "Sodium chromate", color: "#F6EB61", symbol: "Na2CrO4", colorName: "Yellow" },
            { name: "Barium chromate", color: "#F6EB61", symbol: "BaCrO4", colorName: "Yellow" },
            { name: "Copper(II) nitrate", color: "#3A8EBA", symbol: "Cu(No3)2", colorName: "Blue" },
            { name: "Mercury(I) chloride", color: "#FFFFFF", symbol: "Hg2Cl2", colorName: "White" },
            { name: "Mercury(II) chloride", color: "#000000", symbol: "HgCl2", colorName: "Black" },
            { name: "Copper(II) sulfide", color: "#000000", symbol: "CuS", colorName: "Black" },
            { name: "Lead(II) sulfide", color: "#000000", symbol: "PbS", colorName: "Black" },
            { name: "Mercury(II) sulfide", color: "#000000", symbol: "HgS", colorName: "Black" },
            { name: "Bismuth(III) sulfide", color: "#000000", symbol: "Bi2S3", colorName: "Black" },
            { name: "Cadmium sulfide", color: "#FFFF00", symbol: "CdS", colorName: "Yellow" },
            { name: "Tin(IV) sulfide", color: "#FFFF00", symbol: "SnS2", colorName: "Yellow" },
            { name: "Arsenic trisulfide", color: "#FFFF00", symbol: "As2S3", colorName: "Yellow" },
            { name: "Tin(II) sulfide", color: "#A52A2A", symbol: "SnS", colorName: "Brown" },
            { name: "Antimony(III) sulfide", color: "#FFA500", symbol: "Sb2S3", colorName: "Orange" },
            { name: "Potassium permanganate", color: "#8E44AD", symbol: "KMnO4", colorName: "Purple" },
            { name: "Calcium carbonate", color: "#FFFFFF", symbol: "CaCO3", colorName: "White" },
            { name: "Magnesium sulfate", color: "#FFFFFF", symbol: "MgSO4", colorName: "White" },
            { name: "Sodium hydroxide", color: "#0000FF", symbol: "NaOH", colorName: "Blue" },
            { name: "Calcium sulfate", color: "#F5F5DC", symbol: "CaSO4", colorName: "Beige" },
            { name: "Aluminum oxide", color: "#A9A9A9", symbol: "Al2O3", colorName: "Gray" },
            { name: "Iron(III) chloride", color: "#B22222", symbol: "FeCl3", colorName: "Firebrick" },
            { name: "Sodium bicarbonate", color: "#FFFFFF", symbol: "NaHCO3", colorName: "White" },
            { name: "Potassium chloride", color: "#90EE90", symbol: "KCl", colorName: "Light Green" },
            { name: "Lithium carbonate", color: "#FFB6C1", symbol: "Li2CO3", colorName: "Light Pink" },
            { name: "Iron(III) chloride", color: "#B22222", symbol: "FeCl3", colorName: "Firebrick" },
            { name: "Sodium bicarbonate", color: "#FFFFFF", symbol: "NaHCO3", colorName: "White" },
            { name: "Potassium chloride", color: "#90EE90", symbol: "KCl", colorName: "Light Green" },
            { name: "Lithium carbonate", color: "#FFB6C1", symbol: "Li2CO3", colorName: "Light Pink" },
            { name: "Magnesium chloride", color: "#FF6347", symbol: "MgCl2", colorName: "Tomato" },
            { name: "Sodium nitrate", color: "#D2691E", symbol: "NaNO3", colorName: "Chocolate" },
            { name: "Calcium chloride", color: "#FF4500", symbol: "CaCl2", colorName: "Orange Red" },
            { name: "Lithium chloride", color: "#FF1493", symbol: "LiCl", colorName: "Deep Pink" },
            { name: "Iron(III) oxide", color: "#B7410E", symbol: "Fe2O3", colorName: "Rust" },
            { name: "Strontium nitrate", color: "#FF6347", symbol: "Sr(NO3)2", colorName: "Tomato" },
            { name: "Barium sulfate", color: "#FAFAD2", symbol: "BaSO4", colorName: "Light Goldenrod Yellow" },
            { name: "Calcium phosphate", color: "#DCDCDC", symbol: "Ca3(PO4)2", colorName: "Gainsboro" },
            { name: "Copper(II) hydroxid",color: "#0000FF", symbol: "Cu(OH)2",colorName:"Blue"},
            { name: "Lead(II) sulfate", color: "transparent", symbol: "PbSo4 ", colorName: "Colorless" }
        
        ],
        
        anions: [
            { name: "Nitrate", color: "transparent", symbol: "NO3-", colorName: "Colorless" },
            { name: "Sulfate", color: "transparent", symbol: "(SO4)2-", colorName: "Colorless" },
            { name: "Ferric chloride", color: "#FFFF00", symbol: "(FeCl4)-", colorName: "Yellow" },
            { name: "Nickel(II) tetrachloride", color: "#FFFF00", symbol: "(NiCl4)2-", colorName: "Yellow" },
            { name: "Copper(II) tetrachloride", color: "#FFFF00", symbol: "(CuCl4)2-", colorName: "Yellow" },
            { name: "Tetrahydroxochromate(III)", color: "#008000", symbol: "[Cr(OH04)]-", colorName: "Green" },
            { name: "Hexahydroxychromate(III)", color: "#008000", symbol: "[Cr(OH)6]3-", colorName: "Green" },
            { name: "Tetrachlorocobaltate(II)", color: "#0047AB", symbol: "(CoCl4)2-", colorName: "Blue" },
            { name: "Hexahydroxo-cobaltate(II)", color: "#0047AB", symbol: "[Co(OH)6]4-", colorName: "Blue" },
            { name: "Tetrachlorochromate(III)", color: "#800080", symbol: "(CrCl4)-", colorName: "Purple" },
            { name: "Hexachlorochromate(III)", color: "#800080", symbol: "(CrCl6)3-", colorName: "Purple" },
            { name: "Permanganate", color: "#800080", symbol: "(MnO4)-", colorName: "Purple" },
            { name: "Dichromate", color: "#FFA500", symbol: "(Cr2O7)2-", colorName: "Orange" },
            { name: "Chromate", color: "#F6EB61", symbol: "(CrO4)2-", colorName: "Yellow" },
            { name: "Manganate", color: "#008000", symbol: "(MnO4)2-", colorName: "Green" },
            { name: "Dichromate", color: "#FFA500", symbol: "(Cr2O7)2-", colorName: "Orange" },
            { name: "Chromate", color: "#F6EB61", symbol: "(CrO4)2-", colorName: "Yellow" },
            { name: "Manganate", color: "#008000", symbol: "(MnO4)2-", colorName: "Green" },
            { name: "Acetate", color: "transparent", symbol: "C2H3O2-", colorName: "Colorless" },
            { name: "Phosphate", color: "transparent", symbol: "(PO4)3-", colorName: "Colorless" },
            { name: "Carbonate", color: "transparent", symbol: "(CO3)2-", colorName: "Colorless" },
            { name: "Hydroxide", color: "transparent", symbol: "OH-", colorName: "Colorless" },
            { name: "Thiocyanate", color: "#FF0000", symbol: "SCN-", colorName: "Red" },
            { name: "Bromate", color: "#FF6347", symbol: "BrO3-", colorName: "Red-Orange" },
            { name: "Chlorate", color: "#ADFF2F", symbol: "ClO3-", colorName: "Green Yellow" },
            { name: "Perchlorate", color: "#00BFFF", symbol: "ClO4-", colorName: "Deep Sky Blue" },
            { name: "Fluoride", color: "transparent", symbol: "F-", colorName: "Colorless" },
            { name: "Oxalate", color: "transparent", symbol: "C2O4 2-", colorName: "Colorless" },
            { name: "Borate", color: "transparent", symbol: "BO3 3-", colorName: "Colorless" },
            { name: "Arsenate", color: "transparent", symbol: "AsO4 3-", colorName: "Colorless" },
            { name: "Uranate", color: "#FFFF00", symbol: "UO2 2-", colorName: "Yellow" },
            { name: "Tungstate", color: "#B0E0E6", symbol: "(WO4)2-", colorName: "Powder Blue" },
            { name: "Molybdate", color: "#B0E0E6", symbol: "(MoO4)2-", colorName: "Powder Blue" },
            { name: "Selenate", color: "#D2691E", symbol: "(SeO4)2-", colorName: "Chocolate" },
            { name: "Sulfate", color: "transparent",symbol:"SO₄²⁻", colorName:"Colorless"}
        ],
        
        cations: [
            { name: "Tetraamminecadmium(II)", color: "transparent", symbol: "[Cd(NH3)4]2+", colorName: "Colorless" },
            { name: "Tetraamminezinc(II)", color: "transparent", symbol: "[Zn(NH3)4]2+", colorName: "Colorless" },
            { name: "Tetraamminecopper(II)", color: "#003DA5", symbol: "[Cu(NH3)4]2+", colorName: "Prussian Blue" },
            { name: "Hexamminenickel(II)", color: "#00008B", symbol: "[Ni(NH3)6]2+", colorName: "Dark blue" },
            { name: "Hexaamminecobalt(II)", color: "#C19A6B", symbol: "[Co(NH3)6]2+", colorName: "Yellow-brown" },
            { name: "Hexaamminecobalt(III)", color: "#C65D2D", symbol: "[Co(NH3)6]3+", colorName: "Orange-brown" },
            { name: "Diamminesilver(I)", color: "transparent", symbol: "[Ag(NH3)2]+", colorName: "Colorless" },
            { name: "Cadmium", color: "#FFFF00", symbol: "Cd2⁺", colorName: "Yellow" },
            { name: "Hexaaquavanadium(III)", color: "#008000", symbol: "[V(H2O)6]3+", colorName: "Green" },
            { name: "Hexaaquairon(II)", color: "#008000", symbol: "[Fe(H2O)6]2+", colorName: "Green" },
            { name: "Hexaaquinickel(II)", color: "#008000", symbol: "[Ni(H2O)6]2+", colorName: "Green" },
            { name: "Hexaqua-copper(II)", color: "#ADD8E6", symbol: "[Cu(H2O)6]2+", colorName: "Light-blue" },
            { name: "Hexaaquacobalt(II)", color: "#D44A6D", symbol: "[Co(H2O)6]2+", colorName: "Pink" },
            { name: "Hexaaquamanganese(II)", color: "#D44A6D", symbol: "[Mn(H2O)6]2+", colorName: "Pink" },
            { name: "Hexaaquatitanium(III)", color: "#800080", symbol: "[Ti(H2O)6]3+", colorName: "Purple" },
            { name: "Hexaaquavanadium(II)", color: "#800080", symbol: "[V(H2O)6]2+", colorName: "Purple" },
            { name: "Hexaaquachromium(III)", color: "#800080", symbol: "[Cr(H2O)6]3+", colorName: "Purple" },
            { name: "Copper(II)", color: "#0000FF", symbol: "Cu2+", colorName: "Blue" },
            { name: "Iron(III)", color: "#A52A2A", symbol: "Fe3+", colorName: "Yellow to Brown" },
            { name: "Iron(III)", color: "#A52A2A", symbol: "Fe3+", colorName: "Yellow to Brown" },
            { name: "Magnesium", color: "#8B008B", symbol: "Mg2+", colorName: "Purple" },
            { name: "Calcium", color: "#FF8C00", symbol: "Ca2+", colorName: "Dark Orange" },
            { name: "Manganese(III)", color: "#9ACD32", symbol: "Mn3+", colorName: "Yellow-green" },
            { name: "Chromium(III)", color: "#228B22", symbol: "Cr3+", colorName: "Forest Green" },
            { name: "Zinc(II)", color: "#A9A9A9", symbol: "Zn2+", colorName: "Gray" },
            { name: "Titanium(IV)", color: "#FF6347", symbol: "Ti4+", colorName: "Tomato" },
            { name: "Aluminum", color: "#D3D3D3", symbol: "Al3+", colorName: "Light Grey" },
            { name: "Lead(II)", color: "#A9A9A9", symbol: "Pb2+", colorName: "Gray" },
            { name: "Strontium", color: "#FF4500", symbol: "Sr2+", colorName: "Orange Red" },
            { name: "Barium", color: "#32CD32", symbol: "Ba2+", colorName: "Lime Green" },
            { name: "Potassium", color: "#D3D3D3", symbol: "K+", colorName: "Light Gray" },
            { name: "Sodium", color: "#B0C4DE", symbol: "Na+", colorName: "Light Steel Blue" },
            { name: "Ammonium", color: "transparent", symbol: "NH4+", colorName: "Colorless" },
            { name: "Silver", color: "#C0C0C0", symbol: "Ag+", colorName: "Silver" }
        ]
    };

 
    let items = data[section];
    let foundItems = items.filter(item => 
        item.name.toLowerCase().includes(searchInput) || 
        item.symbol.toLowerCase().includes(searchInput)
    );

  
    if (foundItems.length > 0) {
        let item = foundItems[0]; // Take the first match
        resultText.innerHTML = `<strong>Name:</strong> ${item.name}<br><strong>Symbol:</strong> ${item.symbol}<br><strong>Color:</strong> ${item.colorName}`;
        colorBox.style.backgroundColor = item.color;
        // Add a border for transparent/white colors
        if (item.color === "transparent" || item.color === "#FFFFFF") {
            colorBox.style.border = "1px solid #ccc";
        } else {
            colorBox.style.border = "1px solid #ddd";
        }
    } else {
        resultText.textContent = 'No results found';
        colorBox.style.backgroundColor = 'transparent';
        colorBox.style.border = "1px solid #ddd";
    }
}

// Add event listeners for Enter key in search inputs
document.getElementById('compoundsSearch').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchColor('compounds');
    }
});

document.getElementById('anionsSearch').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchColor('anions');
    }
});

document.getElementById('cationsSearch').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchColor('cations');
    }
});






// cal

function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function calculate() {
    let expression = document.getElementById("display").value;

    try {
        // Handle trigonometric functions and convert degrees to radians
        expression = expression.replace(/sin\(([-+]?\d*\.?\d+)\)/g, (match, p1) => `Math.sin(${parseFloat(p1)} * Math.PI / 180)`);
        expression = expression.replace(/cos\(([-+]?\d*\.?\d+)\)/g, (match, p1) => `Math.cos(${parseFloat(p1)} * Math.PI / 180)`);
        expression = expression.replace(/tan\(([-+]?\d*\.?\d+)\)/g, (match, p1) => `Math.tan(${parseFloat(p1)} * Math.PI / 180)`);

        // Now evaluate the expression
        let result = eval(expression);

        // Display the result in the input field
        document.getElementById("display").value = result;
    } catch (error) {
        // Display error message if there is any issue
        document.getElementById("display").value = "Error";
    }
}





//PV = nRT

function calculatePressure() {
    const n = parseFloat(document.getElementById("molesIdeal").value); // Moles (mol)
    const R = 0.0821;                                                  // Ideal gas constant (L·atm/mol·K)
    const T = parseFloat(document.getElementById("temperature").value); // Temperature (K)
    const V = parseFloat(document.getElementById("volume").value);     // Volume (L)
    if (!isNaN(n) && !isNaN(T) && !isNaN(V) && V !== 0) {
        const P = (n * R * T) / V; // Pressure in atm
        document.getElementById("ideal-result").innerText = `Pressure (P) = ${P.toFixed(2)} atm`;
    } else {
        document.getElementById("ideal-result").innerText = "Please enter valid values.";
    }
}

function calculateVolume() {
    const n = parseFloat(document.getElementById("molesIdeal").value); // Moles (mol)
    const R = 0.0821;                                                  // Ideal gas constant (L·atm/mol·K)
    const T = parseFloat(document.getElementById("temperature").value); // Temperature (K)
    const P = parseFloat(document.getElementById("pressure").value);    // Pressure (atm)
    if (!isNaN(n) && !isNaN(T) && !isNaN(P) && P !== 0) {
        const V = (n * R * T) / P; // Volume in L
        document.getElementById("ideal-result").innerText = `Volume (V) = ${V.toFixed(2)} L`;
    } else {
        document.getElementById("ideal-result").innerText = "Please enter valid values.";
    }
}

function calculateMolesIdeal() {
    const P = parseFloat(document.getElementById("pressure").value);    // Pressure (atm)
    const V = parseFloat(document.getElementById("volume").value);     // Volume (L)
    const R = 0.0821;                                                  // Ideal gas constant (L·atm/mol·K)
    const T = parseFloat(document.getElementById("temperature").value); // Temperature (K)
    if (!isNaN(P) && !isNaN(V) && !isNaN(T) && T !== 0) {
        const n = (P * V) / (R * T); // Moles (mol)
        document.getElementById("ideal-result").innerText = `Moles (n) = ${n.toFixed(2)} mol`;
    } else {
        document.getElementById("ideal-result").innerText = "Please enter valid values.";
    }
}

function calculateTemperature() {
    const P = parseFloat(document.getElementById("pressure").value);    // Pressure (atm)
    const V = parseFloat(document.getElementById("volume").value);     // Volume (L)
    const n = parseFloat(document.getElementById("molesIdeal").value); // Moles (mol)
    const R = 0.0821;                                                  // Ideal gas constant (L·atm/mol·K)
    if (!isNaN(P) && !isNaN(V) && !isNaN(n) && n !== 0) {
        const T = (P * V) / (n * R); // Temperature in K
        document.getElementById("ideal-result").innerText = `Temperature (T) = ${T.toFixed(2)} K`;
    } else {
        document.getElementById("ideal-result").innerText = "Please enter valid values.";
    }
}


  // m = Mn
  
  function calculateMass() {
    const M = parseFloat(document.getElementById("molarMass").value); // Molar Mass in g/mol
    const n = parseFloat(document.getElementById("molesMn").value);    // Moles in mol
    if (!isNaN(M) && !isNaN(n)) {
        const m = M * n; // Mass in grams (g)
        document.getElementById("mn-result").innerText = `Mass (m) = ${m.toFixed(2)} g`;
    } else {
        document.getElementById("mn-result").innerText = "Please enter valid values.";
    }
}

function calculateMolarMass() {
    const m = parseFloat(document.getElementById("mass").value);       // Mass in grams (g)
    const n = parseFloat(document.getElementById("molesMn").value);    // Moles in mol
    if (!isNaN(m) && !isNaN(n) && n !== 0) {
        const M = m / n; // Molar Mass in g/mol
        document.getElementById("mn-result").innerText = `Molar Mass (M) = ${M.toFixed(2)} g/mol`;
    } else {
        document.getElementById("mn-result").innerText = "Please enter valid values.";
    }
}

function calculateMolesMn() {
    const m = parseFloat(document.getElementById("mass").value);       // Mass in grams (g)
    const M = parseFloat(document.getElementById("molarMass").value);  // Molar Mass in g/mol
    if (!isNaN(m) && !isNaN(M) && M !== 0) {
        const n = m / M; // Moles in mol
        document.getElementById("mn-result").innerText = `Moles (n) = ${n.toFixed(2)} mol`;
    } else {
        document.getElementById("mn-result").innerText = "Please enter valid values.";
    }
}

 // C = n/V
 
 // Calculate Concentration (C = n / v)
 function calculateConcentration() {
    const n = parseFloat(document.getElementById("molesCv").value);
    const v = parseFloat(document.getElementById("volume").value);
    if (!isNaN(n) && !isNaN(v)) {
      const C = n / v;
      document.getElementById("cv-result").innerText = `Concentration (C) = ${C.toFixed(2)} mol/L`;
      document.getElementById("concentration").value = C.toFixed(2); // Display concentration in the input field
    } else {
      document.getElementById("cv-result").innerText = "Please enter valid values.";
    }
  }

  // Calculate Moles (n = C * V)
  function calculateMolesCv() {
    const C = parseFloat(document.getElementById("concentration").value);
    const v = parseFloat(document.getElementById("volume").value);
    if (!isNaN(C) && !isNaN(v)) {
      const n = C * v;
      document.getElementById("cv-result").innerText = `Moles (n) = ${n.toFixed(2)} mol`;
      document.getElementById("molesCv").value = n.toFixed(2); // Display moles in the input field
    } else {
      document.getElementById("cv-result").innerText = "Please enter valid values.";
    }
  }

  // Calculate Volume (V = n / C)
  function calculateVolume() {
    const n = parseFloat(document.getElementById("molesCv").value);
    const C = parseFloat(document.getElementById("concentration").value);
    if (!isNaN(n) && !isNaN(C)) {
      const v = n / C;
      document.getElementById("cv-result").innerText = `Volume (v) = ${v.toFixed(2)} L`;
      document.getElementById("volume").value = v.toFixed(2); // Display volume in the input field
    } else {
      document.getElementById("cv-result").innerText = "Please enter valid values.";
    }
  }



//organic

function checkAnswers() {
    // Correct answers
    let answers = ["single", "OH", "CHO", "COOH", "O", "NH2", "CONH2", "CN"];

    let userAnswers = [
        document.getElementById("q1").value.trim().toLowerCase(),
        document.getElementById("q2").value.trim().toUpperCase(),
        document.getElementById("q3").value.trim().toUpperCase(),
        document.getElementById("q4").value.trim().toUpperCase(),
        document.getElementById("q5").value.trim().toUpperCase(),
        document.getElementById("q6").value.trim().toUpperCase(),
        document.getElementById("q7").value.trim().toUpperCase(),
        document.getElementById("q8").value.trim().toUpperCase()
    ];

    let resultText = "";
    for (let i = 0; i < answers.length; i++) {
        if (userAnswers[i] === answers[i]) {
            resultText += `✅ Correct: Question ${i+1} <br>`;
        } else {
            resultText += `❌ Wrong: Question ${i+1} (Correct: ${answers[i]}) <br>`;
        }
    }

    document.getElementById("result").innerHTML = resultText;
}

// Function to open the modal and show the clicked image
function openModal(imgElement) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImg");

    modal.style.display = "flex";
    modalImg.src = imgElement.src;
}

// Function to close the modal
function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}


