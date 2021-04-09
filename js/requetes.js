//FETCH, attendre la reponse du serveur avant de continuer l'exécution du code
//function chargerHospitalisations() {
//  fetch("donnees/hospitalisations.json").then(function(resp) {
//     return resp.json()
//     }).then(function(data) {
//     console.log(data)
//  })
//}

//FETCH façon efficace, fonction asynchrone permet d'exécuter le reste du code en attendant la réponse 
//async function chargerHospitalisations() {
//  try {
//    const response = await fetch("donnees/hospitalisations.json")
//    const data = await response.json()
//    chargerListes(data.message)         
//    console.log(data.message)
//  }
//  catch (e) {
//     alert("There was a problem fetching JSON file")
//  }
//}

//façon jQuery AJAX old fashion
                          //fonction flèchée
/*let chargerDonnees = () => {
    $.ajax({
        type: "GET",
        url: "donnees/hospialisations.json",
        dataType: "json", 
        success : (response) => {
            $('#status-text').html("Fichier d'hospitalisations téléchargé avec succès")
            chargerListes(response)
        },
        error : (e) => {
            $('#status-text').html("Échec de téléchargement du fichier d'hospitalisations")       
        }
    }) 
} */

//jQuery AJAX méthode à jour
let chargerDonnees = () => {
    $.ajax({
        type: "GET",
        url: "donnees/hospitalisations.json",
        dataType: "json", 
    }).done((reponse) => {
        $('#status-text').html("Fichier d'hospitalisations téléchargé avec succès")
        chargerListes(reponse)
    }).fail((e) => {
        $('#status-text').html("Échec de téléchargement du fichier d'hospitalisations")
        desactiverMenu()       
    }); 
}

var tabPatients
var tabEtablissements
var tabPropPatients = []            //Attributs dans tableaux de string, 
var tabPropEtablissements = []      //Pratique pour faire l'affichage de plusieurs tables 

function chargerListes (hospitalisations) {
    
    tabPatients = hospitalisations.patients
    for (prop in tabPatients[0]) {
        tabPropPatients.push(prop)
    }

    tabEtablissements = hospitalisations.etablissements
    for (prop in tabEtablissements[0]) {
        tabPropEtablissements.push(prop)
    }

    charger("table-patients", tabPatients, tabPropPatients)
    charger("table-hospitalisations", tabEtablissements, tabPropEtablissements)
    chargerSelect(tabPatients, tabEtablissements)
}


function charger (id, tab, tabProp) {

    let html = ``
    switch (id) {
        case "table-patients" : 
            html+=`<tr><th>Dossier</th><th>Nom</th><th>Prénom</th><th>Date naissance</th><th>Sexe</th></tr>
            `
            break;
        case "table-hospitalisations" :
        case "table-un-patient" :
            html+= `<tr><th>Code d'établissement</th><th>No dossier patient</th><th>Date d'admission</th><th>Date de sortie</th><th>Spécialité</th></tr>
            `
            break;
    }

    Object.keys(tab).map(function (patient) {
        html += `<tr>`    
        for (prop of tabProp) {    
            html += `<td>${tab[patient][prop]}</td>`
        }
        html += `</tr>
    `
        return html
    }).join('')
    
    //document.getElementById(id).innerHTML = html
    $(("#"+id)).html(html)
}


function chargerSelect(tabPatients, tabPropEtablissements) {

    let selectPatients = document.getElementById("select-par-patients")    //Pkoi $('#...) ne fonctionne pas ???!
    for (patient of tabPatients) {
        selectPatients.options[selectPatients.length] = new Option((patient.dossier + " " + patient.nom + ", " + patient.prénom))
    }
}

function desactiverMenu() {

}


/*  Façon plus explicite
    document.getElementById("table-patients").innerHTML = `
        <table id="table-patients">
        <tr>
            <th>Dossier</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Date naissance</th>
            <th>Sexe</th>
        </tr>
        ${Object.keys(hospitalisations.patients).map(function (patient) {
            return `<tr>
                        <td>${hospitalisations.patients[patient]["dossier"]}</td>
                        <td>${hospitalisations.patients[patient]["nom"]}</td>
                        <td>${hospitalisations.patients[patient].prénom}</td>
                        <td>${hospitalisations.patients[patient].naissance}</td>
                        <td>${hospitalisations.patients[patient].sexe}</td>
                    </tr>`
        }).join('')}
    `

    document.getElementById("table-hospitalisations").innerHTML = `
        <table id="table-hospitalisations">
        <tr>
            <th>Code d'établissement</th>
            <th>No dossier patient</th>
            <th>Date d'admission</th>
            <th>Date de sortie</th>
            <th>Spécialité</th>
        </tr>
        ${Object.keys(hospitalisations.etablissements).map(function (etablissement) {
            return `<tr>
                        <td>${hospitalisations.etablissements[etablissement]["code"]}</td>
                        <td>${hospitalisations.etablissements[etablissement]["dossier"]}</td>
                        <td>${hospitalisations.etablissements[etablissement].admission}</td>
                        <td>${hospitalisations.etablissements[etablissement].sortie}</td>
                        <td>${hospitalisations.etablissements[etablissement].specialité}</td>
                    </tr>`
            }).join('')}

    `
*/