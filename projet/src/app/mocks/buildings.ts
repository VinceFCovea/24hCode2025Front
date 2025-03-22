export const listeBatiments = [
    {
        "id": "f644a659-20b1-4c8e-a452-489f250a2d03",
        "description": "Elle n'est pas au Canada",
        "type": "CABANE_DE_BUCHERON",
        "tempsConstruction": 10,
        "estUneMerveille": false,
        "contructibleSur": [],
        "coutParTour": [],
        "coutConstruction": [
          {
            "idRessource": "60a5fea5-64c6-4c51-80cd-149b71b85415",
            "ressource": "NOURRITURE",
            "quantite": 50
          },
          {
            "idRessource": "a5b606f1-b0a9-4dc1-860e-62d88ad12a22",
            "ressource": "POLLUTION",
            "quantite": 10
          },
          {
            "idRessource": "1d78a7ea-2f99-4d37-8fd5-f7fe920bab41",
            "ressource": "BOIS",
            "quantite": 100
          }
        ],
        "bonusConstruction": [
          {
            "idRessource": "5c61c934-8683-49be-84dc-30eb386ec4b5",
            "ressource": "POINT",
            "quantite": 100
          }
        ],
        "bonus": [
          {
            "idRessource": "1d78a7ea-2f99-4d37-8fd5-f7fe920bab41",
            "ressource": "BOIS",
            "quantite": 1,
            "cibleBonus": "EQUIPE",
            "declenchement": {
              "declencheur": "RECOLTE",
              "descriptionDeclencheur": "Declenchement suite à une récolte"
            }
          }
        ],
        "supplement": []
    },
    {
        "id": "d071f12f-c3bd-4d8b-877d-5c5297156b16",
        "description": "La piste de danse des arbres, où les troncs valsent avec les lames pour devenir planches et poutres.",
        "type": "SCIERIE",
        "tempsConstruction": 15,
        "estUneMerveille": false,
        "contructibleSur": [],
        "coutParTour": [
          {
            "idRessource": "b5bc8164-3cbb-4669-a539-af475bdf06e4",
            "ressource": "ENERGIE",
            "quantite": 1
          },
          {
            "idRessource": "a5b606f1-b0a9-4dc1-860e-62d88ad12a22",
            "ressource": "POLLUTION",
            "quantite": 1
          }
        ],
        "coutConstruction": [
          {
            "idRessource": "80ed5f30-2706-4848-8f97-4cdc76ac903c",
            "ressource": "FER",
            "quantite": 50
          },
          {
            "idRessource": "a5b606f1-b0a9-4dc1-860e-62d88ad12a22",
            "ressource": "POLLUTION",
            "quantite": 30
          },
          {
            "idRessource": "953a6c6a-ffb8-49fc-a7bb-f03236eb7ec5",
            "ressource": "PIERRE",
            "quantite": 50
          },
          {
            "idRessource": "60a5fea5-64c6-4c51-80cd-149b71b85415",
            "ressource": "NOURRITURE",
            "quantite": 100
          },
          {
            "idRessource": "1d78a7ea-2f99-4d37-8fd5-f7fe920bab41",
            "ressource": "BOIS",
            "quantite": 250
          }
        ],
        "bonusConstruction": [
          {
            "idRessource": "5c61c934-8683-49be-84dc-30eb386ec4b5",
            "ressource": "POINT",
            "quantite": 300
          }
        ],
        "bonus": [
          {
            "idRessource": "1d78a7ea-2f99-4d37-8fd5-f7fe920bab41",
            "ressource": "BOIS",
            "quantite": 3,
            "cibleBonus": "EQUIPE",
            "declenchement": {
              "declencheur": "AUTO",
              "descriptionDeclencheur": "Declenchement d'un tour de jeu"
            }
          },
          {
            "idRessource": "1d78a7ea-2f99-4d37-8fd5-f7fe920bab41",
            "ressource": "BOIS",
            "quantite": 1,
            "cibleBonus": "EQUIPE",
            "declenchement": {
              "declencheur": "RECOLTE",
              "descriptionDeclencheur": "Declenchement suite à une récolte"
            }
          }
        ],
        "supplement": []
    },
    {
        "id": "06fceabf-3e07-441f-92fd-fc37d2647611",
        "description": "Le repaire des casse-cous de la pierre !",
        "type": "ATELIER_DE_TAILLE_DE_PIERRE",
        "tempsConstruction": 10,
        "estUneMerveille": false,
        "contructibleSur": [],
        "coutParTour": [],
        "coutConstruction": [
          {
            "idRessource": "a5b606f1-b0a9-4dc1-860e-62d88ad12a22",
            "ressource": "POLLUTION",
            "quantite": 10
          },
          {
            "idRessource": "953a6c6a-ffb8-49fc-a7bb-f03236eb7ec5",
            "ressource": "PIERRE",
            "quantite": 50
          },
          {
            "idRessource": "1d78a7ea-2f99-4d37-8fd5-f7fe920bab41",
            "ressource": "BOIS",
            "quantite": 100
          },
          {
            "idRessource": "60a5fea5-64c6-4c51-80cd-149b71b85415",
            "ressource": "NOURRITURE",
            "quantite": 50
          }
        ],
        "bonusConstruction": [
          {
            "idRessource": "5c61c934-8683-49be-84dc-30eb386ec4b5",
            "ressource": "POINT",
            "quantite": 150
          }
        ],
        "bonus": [
          {
            "idRessource": "953a6c6a-ffb8-49fc-a7bb-f03236eb7ec5",
            "ressource": "PIERRE",
            "quantite": 1,
            "cibleBonus": "EQUIPE",
            "declenchement": {
              "declencheur": "RECOLTE",
              "descriptionDeclencheur": "Declenchement suite à une récolte"
            }
          }
        ],
        "supplement": []
    }
]