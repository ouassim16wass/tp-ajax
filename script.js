lignes = 0;
total_points = 0;

function doInsertRowTable(num,nom,prenom,points) {
    const tab = document.getElementsByTagName('table')[0];

    row = document.createElement("tr");

    row.setAttribute("class", "row");

    col1 = document.createElement('td');
    col2 = document.createElement('td');
    col3 = document.createElement('td');
    col4 = document.createElement('td');
    col5 = document.createElement('td');


    inp = document.createElement('input')

    inp.setAttribute("type", "checkbox")



    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;
    col5.appendChild(inp);

    
    col1.setAttribute("class","col_number")
    col2.setAttribute("class","col_text")
    col3.setAttribute("class","col_text")
    col4.setAttribute("class","col_number")
    col5.setAttribute("class","col_chkbox")

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);

    tab.appendChild(row);

}


// partie 3

persons = [
    {
        nom: "nom-1",
        prenom: "prenome-1",
        points: 5
    },
    {
        nom: "nom-2",
        prenom: "prenome-2",
        points: 10
    },
    {
        nom: "nom-3",
        prenom: "prenome-3",
        points: 15
    }
]

init()

function init() {
    for (let p of persons) {
        doInsert(p.nom,p.prenom,p.points);
    }
}

function doInsert(nom,prenom,points) {

    lignes ++;
    total_points += points;

    num = 99;

    doInsertRowTable(lignes,nom,prenom,points);

    update_summary();

}

function update_summary() {
    
    element_lignes = document.getElementById('p1')
    element_points = document.getElementById('p3');

    element_lignes.innerText = lignes + ' Ligne(s)';
    element_points.innerText = 'Totale point(s) ' + total_points;
}

function ConsoleTableau() {

    console.log(persons)
}


function doNewData() {
    elt_nom = document.getElementById('form_nom');
    elt_prenom = document.getElementById('form_prenom');
    elt_points = document.getElementById('form_points');

    nom = elt_nom.value;
    prenom = elt_prenom.value;
    points = parseInt(elt_points.value);

    if(nom == " " || prenom == " " || Number.isNaN(points)) {
        window.alert("Formulaire incomplet!")
    }else {

        
        doInsert(nom,prenom,points);

        persons.push({nom, prenom,points})

        elt_nom.value = " ";
        elt_prenom.value = " ";
        elt_points.value = " ";
    }

}


// partie 6 

function deleteRow() {

    // vérifier si les tableau est vide.
    if(lignes<=0) {
        //  Si oui alert
        alert("tableau deja vide !");
    }else {
        // Si NON
        // récupérer l'élément table
        table = document.getElementsByTagName("table")[0];
        // récupérer touts les éléments checkbox
        chkbox_list = table.querySelectorAll(".col_chkbox input")
        isOneChecked = false;

        // vérifier s'il ya un élément  checkbox qui est cocher
        for (let i = 0; i < chkbox_list.length; i++) {
            if(chkbox_list[i].checked)
                isOneChecked = true;
        }

        if(! isOneChecked)
            alert("Selectionner au moins une ligne !")

        else {
            // s'il ya une ligne cocher
            if(confirm('Vouler-vous vraiment supprimer les lignes ?')) {
                element_found = false;
                // récupérer l'élément  table
                table = document.getElementsByTagName('table')[0];
                // récupérer touts les elements row de cette table
                rows = table.getElementsByClassName('row');
                let i=0;
                // parcourir la table ligne par ligne
                while(i<rows.length) {
                    // vérifier si cette ligne est cocher
                    if(rows[i].lastChild.firstChild.checked) {
                        // si oui
                        // modifier la valuer points (points moins la valeur de la ligne supreme)
                        total_points = total_points - parseInt(rows[i].childNodes[3].innerText);
                        // supprimer la ligne  i
                        rows[i].remove();
                        // supprimer  le i'eme objet dans notre tablau  d'objets 
                        persons.splice(i,1);
                        // maitre a jour le boolean a vrai
                        element_found = true;
                        // diminuer la valeur du compteur  car   la taiile de notre tableau a est diminuer par 1 
                        i--;
                        // diminuer le nbr de lignes

                        lignes--;
                    }
                    // augmanter la valeur du compteur de boucle pour traiter la ligne suivante
                    i++;
                }
                alert("ligne supprimee ave succes !")
                // modifier les valeur dans le navigateur
                update_summary();
            }
        }
    }
}
