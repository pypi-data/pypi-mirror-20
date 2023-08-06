xml-archive-to-pdf
==================

.. image:: https://travis-ci.org/unistra/xml-archive-to-pdf.svg?branch=master
    :target: https://travis-ci.org/unistra/xml-archive-to-pdf
    :alt: Build

.. image:: http://coveralls.io/repos/unistra/xml-archive-to-pdf/badge.png?branch=master
    :target: http://coveralls.io/r/unistra/xml-archive-to-pdf?branch=master
    :alt: Coverage

.. image:: https://img.shields.io/badge/status-stable-green.svg
    :target: https://gitlab.unistra.fr/di/alumni-forms
    :alt: Status

.. image:: https://img.shields.io/badge/python-3.4-blue.svg
    :target: https://www.python.org/download/releases/3.4.0/
    :alt: Python 3.4

.. image:: https://img.shields.io/badge/licence-PSF-blue.svg
    :target: https://docs.python.org/3/license.html
    :alt: Licence

Transformation d'un fichier xml de type *unistra:archive* en fichier pdf

Installation
------------

.. code-block:: bash

    pip install xml-archive-to-pdf

Usage
-----

.. code-block:: bash

    xml-archive-to-pdf -i tests/data/pathfinder_1.xml -o /tmp/pathfinder_1.pdf --logo tests/data/logo.png --font tests/data/CustomFont

Documentation
-------------

Structuration d'un fichier xml de type *unistra:archive*
********************************************************

L'objectif est de pouvoir générer simplement un fichier pdf en se basant sur un fichier xml conforme à la norme *unistra:archive*.
En amont, il faudra s'assurer que le fichier xml soit validé par un schéma xsd et qu'il contient toutes les informations nécessaires à la fabrication du pdf.

On aura principalement :

* Des blocs séparés par des titres
* Des clés avec un intitulé parlant dans l'attribut name
* Des valeurs
* Une mise en forme de tableau dans l'attribut style

Concernant le rendu des éléments dans le pdf :

* Lorsque l'on met l'attribut *style="table"*, l'ensemble du bloc est affiché comme un tableau.
  Le premier élément permet de définir le nom des colonnes. Tous les éléments suivants doivent avoir les mêmes colonnes.
  Celui-ci doit être structuré de la même manière que l'exemple ci-dessous.
* En dehors des tableaux, lorsqu'un tag possède des enfants, c'est que c'est un titre. Sinon, c'est un ensemble clé-valeur.
* Il y 6 niveaux d'indentation maximum et les tableaux ne sont pas indentés
* Pour les labels, si l'attribut name est rempli, on l'utilise. S'il est absent, on utilise le nom du tag et s'il est vide, on met un blanc.


Exemple d'un fichier xml
************************

.. code-block:: xml

    <?xml version="1.0" encoding="UTF-8"?>
    <!-- Racine du fichier, id et source sont optionnels, le name correspond au titre -->
    <personnage xmlns="fr:unistra:di:archive:pathfinder:v1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="fr:unistra:di:archive:pathfinder:v1 pathfinder_v1.xsd"
        id="1" source="pathfinder" name="document récapitulatif du personnage 1 de pathfinder">
        <!-- Affiche le sous-titre de l'état civil -->
        <etat-civil name="son état civil">
            <!-- Affichage de clés/valeurs -->
            <nom>Sombre-crâne</nom>
            <age name="son âge">20</age>
            <!-- Nouveau bloc avec un sous-titre -->
            <classes name="classes et niveaux">
                <!-- Ici on affiche le sous-titre de name -->
                <classe name="Première classe">
                    <nom>Barbare</nom>
                    <niveau>3</niveau>
                </classe>
                <!-- Ici name est vide, donc ça affiche un titre vide -->
                <classe name="">
                    <nom>Prêtre combattant</nom>
                    <niveau>1</niveau>
                </classe>
                <!-- Lorsqu'il n'y a pas d'attribut name, on affiche le nom du tag. Ici classe -->
                <classe>
                    <nom>Moine</nom>
                    <niveau></niveau>
                </classe>
            </classes>
        </etat-civil>
        <quetes style="title" name="Quêtes en cours" />
        <!-- Element de style tableau -->
        <armes style="table" name="Liste des armes">
            <arme>
                <nom>cimeterre</nom>
                <type>à deux mains</type>
                <portee name="portée">3</portee>
                <degat name="dégât">7</degat>
                <element name="élément">feu</element>
                <rarete name="rareté">épique</rarete>
                <prix>1000</prix>
                <qualite name="qualité">très bonne</qualite>
            </arme>
            <arme>
                <nom>arc</nom>
                <type>à distance</type>
                <portee>8</portee>
                <degat>2</degat>
                <element>glace</element>
                <rarete>simple</rarete>
                <prix>100</prix>
                <qualite>mauvaise</qualite>
            </arme>
            <arme>
                <nom>épée</nom>
                <type>à une main</type>
                <portee>5</portee>
                <degat>3</degat>
                <element>terre</element>
                <rarete>rare</rarete>
                <prix>500</prix>
                <qualite>moyenne</qualite>
            </arme>
        </armes>
        <familier>
            <nom>ronron</nom>
            <type>sanglier</type>
        </familier>
    </personnage>


Légende de l'exemple
********************

attributs
#########

* name : intitulé parlant qui servira de label/titre à la place du nom du tag
* style : style d'un bloc

  * table: affichage sous forme d'un tableau. Le tableau se redimensionne automatiquement en fonction du nombre de colonnes.
    Attention néanmoins à ne pas utiliser trop de colonnes ou des éléments trop gros, car le rendu pourrait ne pas correspondre vos attentes.
  * title: permet de forcer l'affichage sous forme de titre. Ca peut être utile dans le cas où on veut afficher un tag vide comme un titre et
    non pas comme une clé/valeur.


Résultat
********

* `Fichier pdf de l'exemple <https://github.com/unistra/xml-archive-to-pdf/blob/master/tests/data/pathfinder_1.pdf>`_

Autres
*******
* --logo : le paramètre logo est optionnel et permet de rajouter un logo sur le document en haut à droite
* --font : le paramètre font est optionnel et permet de remplacer la font par défaut par une autre font
  Attention, le dossier qui contiendra la font doit obligatoirement avoir les 4 fichiers suivants:

  * CustomFont-BoldOblique.ttf
  * CustomFont-Bold.ttf
  * CustomFont-Oblique.ttf
  * CustomFont.ttf
