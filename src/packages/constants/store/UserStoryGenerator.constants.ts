import { UserStoryBeingGeneratedState } from '../../../store';

export const useUserChoiceTopicScreen = false;
export const useUserBeingGeneratedStoryScreen = false;
export const useUserFinishedStoryScreen = false;

export const userChoiceTopicData: UserStoryBeingGeneratedState = {
    isLoading: false,
    data: {
        id: null,
        state: 'selectTopic',
        currentStep: 0,
        allTopics: [
            {
                text: "Alice rejoint une équipe de gnomes joueurs qui l'aident à propager la joie et le rire dans son quartier",
                description:
                    'Alice joins a team of mischievous garden gnomes who help her spread joy and laughter throughout her neighborhood',
            },
            {
                text: "Un agent de police découvre qu'un groupe secret de gens bienveillants laissent des cadeaux aléatoires pour des inconnus dans la ville",
                description:
                    'A traffic warden discovers that a secret group of kind-hearted citizens have been leaving random presents for strangers around the city',
            },
            {
                text: "Une jeune fille découvre que, lorsqu'elle sourit, des arc-en-ciel apparaissent dans le ciel et sa joie encourage les autres également",
                description:
                    'A young girl discovers that when she smiles, rainbows appear in the sky and her happiness spreads joy to everyone around her',
            },
            {
                text: 'Un jeune homme voyage dans un village reculé et trouve une forme unique de comédie et de jeu partagée par les locaux qui apporte la joie et des surprises à chacun',
                description:
                    'A young man travels to a remote village and finds a unique form of comedy and play shared by the locals that brings joy and surprises to everyone',
            },
        ],
        allChapters: [],
    },
    error: null,
};

export const userBeingGeneratedStoryData: UserStoryBeingGeneratedState = {
    isLoading: false,
    data: {
        id: '641dddb07eca6b26a6b7b501',
        state: 'generating',
        currentStep: 4,
        allTopics: [
            {
                text: '1. Un jeune couple visite une maison hantée connue sous le nom de "Hill House" pour étudier l\'activité paranormale qui aurait eu lieu',
                description:
                    "1. A young couple visits a haunted house known as 'Hill House' to research the paranormal activity that is said to have occurred",
            },
            {
                text: "2. Un adolescent imprudent sort un livre ancien d'une étagère de bibliothèque, seulement pour découvrir qu'il a invoqué un monstre terrifiant",
                description:
                    '2. An unsuspecting teenager pulls an ancient book off of a library shelf, only to find out that they have summoned a terrifying monster',
            },
            {
                text: "3. Un groupe d'amis part en week-end camping dans les bois et se retrouve terrorisé par un tueur en série",
                description:
                    '3. A group of friends take a weekend camping trip in the woods and find themselves being terrorized by a serial killer',
            },
            {
                text: "4. Une femme se réveille au milieu de la nuit après avoir fait un cauchemar à propos d'une figure enveloppée dans le noir, seulement pour découvrir que c'est réel",
                description:
                    '4. A woman wakes in the middle of the night after having a nightmare about a figure cloaked in black, only to discover it is real',
            },
        ],
        allChapters: [
            {
                title: 'Exploration de Hill House',
                text: "John et Emma se tenaient devant Hill House, une vieille maison hantée réputée pour les évènements paranormaux qui s'y étaient produits. Un air de malaise flottait dans l'air alors qu'ils s'approchaient du perron et saisissaient la poignée de la vieille porte en fer forgé. John finit par ouvrir la porte et un courant d'air frais s'en échappa. Ils entrèrent dans l'obscurité de la pièce, la tension et l'angoisse qui croissait en eux à chaque pas. ",
                allChoices: [
                    {
                        text: 'Explorer le rez-de-chaussée',
                    },
                    {
                        text: "Monter à l'étage",
                    },
                    {
                        text: 'Fuir sous le coup de la peur',
                    },
                ],
                description: 'An old creepy house',
                selectedChoiceIndex: 1,
            },
            {
                title: 'Au deuxième étage',
                text: "Tu commences à monter l'escalier. Tu es rempli d'angoisse à chaque pas que tu fais sur les marches qui craquent. Tu es à mi-chemin à l'étage lorsque tu commences à entendre un bruit lointain. Tu continues à monter les marches, agrippé au garde main et en essayant de ne pas trébucher. Tu arrives enfin à l'étage et le bruit s'intensifie. Tu commences à marcher vers le bruit et tu remarques un couloir avec des portes tous les cinq mètres. Tu continues à avancer et tu arrives devant une grande porte en bois. Tu t'arrêtes et essaies de deviner d'où vient le bruit. Tu t'aventures à ouvrir la porte et tu es immédiatement assailli par des cris effrayants. Peur et curiosité font que tu continues d'avancer jusqu'à une petite pièce remplie de miroirs. Tu réalises, horrifié que le bruit vient de la pièce. Tu entrevois le reflet de quelqu'un qui a l'air familier. La personne tourne la tête et tu réalises que c'est toi. La seule chose que tu peux faire est de sortir en courant.",
                summary:
                    "Tu pars à la recherche du bruit, dans un couloir avec plusieurs portes à intervalles réguliers. Tu découvres une grande porte en bois et ouvres en voyant un reflet de quelqu'un dans plusieurs miroirs ; ce reflet est le tien. Tu t'enfuis terrifié.",
                allChoices: [
                    {
                        text: 'Chercher un moyen de sortir',
                    },
                    {
                        text: "Essayer de comprendre ce qu'il se passe",
                    },
                    {
                        text: "Essayer de fuir par l'escalier",
                    },
                ],
                description: 'Dark hallway with doors',
                selectedChoiceIndex: 0,
            },
            {
                title: "La Fin de l'Étrange",
                text: "Tu n'es pas sûr du chemin qui t'a mené ici, mais tu sais que le seul moyen de sortir est de trouver le reflet dans le miroir. Tu cherches consciencieusement dans les pièces, à travers les couloirs, mais ton reflet semble se cacher. Tu continues  à chercher avec désespoir et entres finalement à l'intérieur d'une pièce que tu n'avais pas réussi à trouver avant. Une fois l'intérieur de la pièce, tu réalises que le miroir à l'autre bout de la pièce est en fait ton reflet. Tu te retrouves couvert de sueur et épuisé, mais avec une certaine satisfaction car tu as finalement trouvé le moyen de sortir. Tu tires sur le reflet et la porte se débloque, te libérant de l'obscurité. Tu te retrouves à l'air libre et dans un endroit sûr.",
                summary:
                    'Depuis que tu es entré dans cette maison, tu as vu des choses terrifiantes. Tu as rencontré des créatures sombres et oppressantes. Tu as traversé des couloirs et ouvert des portes cachées intransigeantes. Tu as trouvé des miroirs terrifiants et des reflets inquiétants. Tu es arrivé à un stade où tu es à la recherche de ton reflet pour te libérer. Après des recherches acharnées et épuisantes, tu trouves enfin ton reflet et tu tires dessus, libérant la porte et toi-même.',
                allChoices: [
                    {
                        text: 'Continuer à Chercher',
                    },
                    {
                        text: 'Détruire le Reflet',
                    },
                    {
                        text: 'Ouvrir la Porte',
                    },
                ],
                description: 'Mystérieuse maison sombre',
                selectedChoiceIndex: 0,
            },
            {
                title: 'Miroir Ovéré',
                text: "Après avoir abattu ton reflet, la porte s'est ouverte, mais une fois traversée, tu ne sais pas vraiment où tu es. Tu te retrouves dans une immense pièce blanche, baignée de lumière qui semble provenir de partout. Au milieu de la pièce, se trouve un miroir ovale d'environ trois mètres de diamètre. Tu vois ton reflet dans le miroir, mais cette fois, tu te vois plus âgé, avec des traits plissés et ridés. Tu vois les mêmes halos lumineux qui t'entourent et tu remarques que tu portes autour de ton cou une délicate chaîne en argent. Tu approches et, à ton grand étonnement, tu vois que la chaîne est attachée à l'intérieur du miroir.",
                summary:
                    "Depuis que tu es entré dans cette maison, tu as vu des choses terrifiantes. Tu as rencontré des créatures sombres et oppressantes. Tu as traversé des couloirs et ouvert des portes cachées intransigeantes. Tu as trouvé des miroirs terrifiants et des reflets inquiétants. Tu as abattu ton reflet et libéré la porte. Maintenant, tu te retrouves dans une immense pièce blanche, baignée de lumière qui semble provenir de partout. Au milieu de la pièce, se trouve un miroir ovale d'environ trois mètres de diamètre.  Tu vois ton reflet dans le miroir, mais tu te vois plus âgé et tu as remarqué que tu portais une chaîne en argent.",
                allChoices: [
                    {
                        text: "Abandonner la chaîne et s'arrêter ici",
                    },
                    {
                        text: 'Tirer sur la chaîne pour la décrocher',
                    },
                    {
                        text: "Rechercher d'autres indices dans la pièce",
                    },
                ],
                description: 'Mysterious empty room',
            },
        ],
    },
    error: null,
};

export const userFinishedStoryData: UserStoryBeingGeneratedState = {
    isLoading: false,
    data: {
        id: '641dd4e08e296c8956faa913',
        state: 'finished',
        currentStep: 2,
        allTopics: [
            {
                text: 'La bataille de Gettysburg',
                description: 'The Battle of Gettysburg',
            },
            {
                text: "L'invention du téléphone",
                description: 'The Invention of the Telephone',
            },
            {
                text: "L'assassinat d'Abraham Lincoln",
                description: 'The Assassination of Abraham Lincoln',
            },
            {
                text: 'Le ravitaillement aérien de Berlin',
                description: 'The Berlin Airlift',
            },
        ],
        allChapters: [
            {
                title: 'La Bataille de Gettysburg',
                text: "La bataille de Gettysburg fût la plus sanglante et la plus décisive de la guerre de sécession. Le 19 juillet 1863, deux grandes armées s'affrontèrent pour le contrôle d'un petit village de Pennsylvanie. Les forces unionistes étaient commandées par le Générale George Meade et les forces confédérées étaient commandées par le Général Robert E. Lee. Après 3 jours de combats violents et meurtriers, l'armée de Lee battit en retraite et resta pour toujours dans l'histoire comme la plus grande bataille de la guerre civile américaine.",
                allChoices: [
                    {
                        text: 'Se battre dans les rangs unionistes',
                    },
                    {
                        text: 'Se battre dans les rangs confédérés',
                    },
                    {
                        text: 'Rester en dehors de la bataille',
                    },
                ],
                description: 'Une chaude matinée estivale.',
                selectedChoiceIndex: 1,
            },
            {
                title: 'La victoire finale',
                text: "Le personnage choisit de se battre dans les rangs confédérés et il trouva sa motivation en pensant aux intérêts supérieurs du pays. Il s'entraina dur et offrit une lutte acharnée jusqu'à la fin. Malgré la force de l'armée de l'Union, la ténacité du personnage et du reste de l'armée confédérée leur permit de finalement remporter la victoire. Le personnage connut de la gloire et de la maturité, sachant qu'il avait aidé à restaurer la nation.",
                description: 'Soldats victorieux célébrant.',
            },
        ],
    },
    error: null,
};
