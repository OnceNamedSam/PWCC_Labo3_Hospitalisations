function afficherPatients() {
    $('#table-patients').css({"opacity":"1", "transform":"scale(1)"})
    $('#table-hospitalisations').css({"opacity":"0", "transform":"scale(0.5)"})
    $('#select-par-patients').css({"opacity":"0", "transform":"scale(0.5)"})
    $('#table-un-patient').css({"opacity":"0", "transform":"scale(0.5)"})
    $('#status-text').html("Visualisation de la liste des patients par numéro de dossier")
}

function afficherHospitalisations() {
    $('#table-patients').css({"opacity":"0", "transform":"scale(0.5)"})
    $('#table-hospitalisations').css({"opacity":"1", "transform":"scale(1)"})
    $('#select-par-patients').css({"opacity":"0", "transform":"scale(0.5)"})
    $('#table-un-patient').css({"opacity":"0", "transform":"scale(0.5)"})
    $('#status-text').html("Visualisation de la liste des hospitalisations par établissements")
}

function afficherParPatients() {
    document.getElementById("select-par-patients").selectedIndex = 0
    $('#table-patients').css({"opacity":"0", "transform":"scale(0.5)"})
    $('#table-hospitalisations').css({"opacity":"0", "transform":"scale(0.5)"})
    $('#select-par-patients').css({"opacity":"1", "transform":"scale(1)"})
    $('#table-un-patient').css({"opacity":"0", "transform":"scale(0.5)"})
    $('#status-text').html("Visualisation de la liste des hospitalisations par patient")
}

function reinitialiser() {
    $('#table-patients').css({"opacity":"0", "transform":"scale(0.5)"})
    $('#table-hospitalisations').css({"opacity":"0", "transform":"scale(0.5)"})
    $('#select-par-patients').css({"opacity":"0", "transform":"scale(0.5)"})
    $('#table-un-patient').css({"opacity":"0", "transform":"scale(0.5)"})
    $('#status-text').html("Dossiers chargés. Prêt pour instructions")
}

function afficherUnPatient() {

    let tabUnPatient = []
    let posiPatient = (document.getElementById("select-par-patients").selectedIndex)

    if (posiPatient != 0) {
        for (unPatient of tabEtablissements) {
            if (unPatient.dossier === posiPatient)
                tabUnPatient.push(unPatient)
        }
        if (tabUnPatient.length < 1) {
            $('#status-text').html("Aucune hospitalisation enregistrée pour ce patient")
        } 
        else {
            $('#status-text').html(tabUnPatient.length + " hospitalisation(s) enregistrée(s) pour ce patient")
        }
        charger("table-un-patient", tabUnPatient, tabPropEtablissements)
        $('#table-un-patient').css({"opacity":"1", "transform":"scale(1)"})
    }
    else {
        $('#table-un-patient').css({"opacity":"0", "transform":"scale(0.5)"})
        $('#status-text').html("Visualisation de la liste des hospitalisations par patient")
    }
}