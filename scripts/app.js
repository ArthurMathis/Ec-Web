const liste = document.getElementById('livraison');

class Colis{
    constructor(id, format, poids){
        // _ indique que la variable est privée (par convention)
        this.id = id;
        this.format = format;
        this.poids = poids;
    }

    identifiant(){ 
        return this.id; 
    }

    format(){
        return this.format;
    }

    poids(){
        return this.poids;
    }

    prix(){
        return 2 * this.format + 5 * this.poids;
    }

    static toObject(){
        return {
            id: this.id,
            format: this.format,
            poids: this.poids
        }
    }

    static depuisObjet(obj){
        return new Colis(obj.id, obj.format, obj.poids);
    }
}

function itemColis(c){
    // On génère les nouveaux éléments du DOM
    const li = document.createElement('li');
    const code = document.createElement('code');
    const catégorie = document.createElement('strong');
    const poids = document.createElement('em');

    // On les paramètres
    code.textContent = c.identifiant();
    catégorie.className = 'number';
    catégorie.textContent = c.format;
    poids.className = 'number';
    poids.textContent = c.poids;

    // On les ajoute à la li
    li.append('Colis', code, ':', 'Catégorie', catégorie, 'Poids', poids, 'kg');
    return li;
}

function afficherLivraison(livr, div){
    // On récupère les éléments
    const p = div.getElementsByTagName('p')[0];
    const ul = div.getElementsByTagName('ul')[0];

    // On ajoute le contenu texte
    p.textContent = livr.id;

    // On efface le contenu
    ul.textContent = "";
    // On ajoute les items
    livr.colis.forEach(c => {
        ul.appendChild(itemColis(c));
    });

}

function ajouterAffichageColis(c, div){
    // On ajoute un élément
    div.getElementsByTagName('ul')[0].appendChild(itemColis(c));
}

function colisDuFormulaire(){
    // On récupère les balises
    const formulaire =  document.getElementById('formulaire-colis');
    // ON récupère les informations du formulaire
    let identifiant = document.getElementsByName('identifiant')[0].value;
    let format = parseInt(document.getElementsByName('format')[0].value);
    let poids = parseFloat(document.getElementsByName('poids')[0].value);

    // On vérifie les informations
    if(identifiant === '' || format === ''){
        identifiant = 'Colis sans titre';
        format = 0;
        poids = 0.0;
    } 
    // On vide le formulaire
    reinitialiserFormulaire();
    // On renvoie le nouveau colis
    return new Colis(identifiant, format, poids);
}

function reinitialiserFormulaire(){
    const formulaire =  document.getElementById('formulaire-colis');
    document.getElementsByName('identifiant')[0].value = '';
    document.getElementsByName('format')[0].value = 1;
    document.getElementsByName('poids')[0].value = '';
}

function ajouterColisDuFormulaire(){
    const c = colisDuFormulaire();
    if(c.identifiant !== '' && c.format !== '' && c.poids !== ''){
        ajouterAffichageColis(c ,liste); 
    }
}

function onReponse(event) {
    const id = event.target.id;
    if (id === 'bajouter') { ajouterColisDuFormulaire(); } 
    else if (id === 'bannuler') { reinitialiserFormulaire(); }
}

function init() {
    document.getElementById('formulaire-colis').addEventListener('click', onReponse);
}

window.addEventListener('load', init, false);

const c1 = new Colis('David', 1, 2.3);
const c2 = new Colis('Papa de David', 5, 3.7);
const c3 = new Colis('Maman de David', 12, 34.2);
const livraison = {
    id: "Livraison pour David",
    colis: [c1,c2]
};

afficherLivraison(livraison, liste);
ajouterAffichageColis(c3, liste);
