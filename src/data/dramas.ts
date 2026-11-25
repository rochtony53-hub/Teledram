export interface Episode {
  n: number;
  title: string;
  duration: string; // "12:40"
  seconds: number;
  synopsis: string;
  video: string;
  free?: boolean;
}

export interface Drama {
  id: string;
  title: string;
  originalTitle: string;
  tagline: string;
  genre: string;
  year: number;
  rating: number; // /10
  views: string; // "2,4M"
  poster: string; // path, or "" when art mode
  art?: boolean; // code-drawn typographic poster
  synopsis: string;
  cast: string[];
  tags: string[];
  featured?: boolean;
  trending?: number; // rank
  isNew?: boolean;
  episodes: Episode[];
}

const V = {
  blaze: "/videos/ep-or.mp4",
  escapes: "/videos/ep-nuit.mp4",
  fun: "/videos/ep-crimson.mp4",
  joyrides: "/videos/ep-noir.mp4",
  meltdowns: "/videos/ep-rose.mp4",
  bunny: "/videos/ep-emeraude.mp4",
  dream: "/videos/ep-or.mp4",
  sintel: "/videos/ep-emeraude.mp4",
  tears: "/videos/ep-rose.mp4",
  subaru: "/videos/ep-noir.mp4",
};

const cycle = (base: string[]): string[] => base;

export const DRAMAS: Drama[] = [
  {
    id: "heritier-disparu",
    title: "L'Héritier Disparu",
    originalTitle: "The Lost Heir",
    tagline: "Il est revenu pour reprendre ce qui lui a été volé.",
    genre: "Drame · Famille",
    year: 2025,
    rating: 9.2,
    views: "12,8M",
    poster: "/assets/poster-heritier.jpg",
    featured: true,
    trending: 1,
    isNew: true,
    synopsis:
      "Chassé de sa famille à l'âge de huit ans, Adrian Sterling réapparaît vingt ans plus tard, plus riche et plus redoutable que jamais. Sous les ors du manoir familial, chaque sourire cache un poignard et chaque secret a un prix. Entre vérité et vengeance, jusqu'où ira-t-il pour récupérer son nom ?",
    cast: ["Adrian Sterling", "Victoria Hale", "Marcus Sterling", "Elena Voss"],
    tags: ["vengeance", "billionnaire", "secret", "famille"],
    episodes: [
      { n: 1, title: "Le retour", duration: "11:24", seconds: 684, synopsis: "Un inconnu en costume trois pièces débarque au conseil d'administration des Sterling.", video: cycle([V.blaze])[0], free: true },
      { n: 2, title: "Le testament", duration: "10:18", seconds: 618, synopsis: "Une clause oubliée du testament du grand-père bouleverse l'équilibre du pouvoir.", video: cycle([V.blaze])[0], free: true },
      { n: 3, title: "Premier sang", duration: "12:02", seconds: 722, synopsis: "Adrian lance sa première offre publique d'achat — et sa première menace.", video: cycle([V.blaze])[0] },
      { n: 4, title: "Le masque tombe", duration: "11:47", seconds: 707, synopsis: "Victoria découvre une photo d'enfance qui change tout ce qu'elle croyait savoir.", video: cycle([V.blaze])[0] },
    ],
  },
  {
    id: "coeur-du-loup",
    title: "Le Cœur du Loup",
    originalTitle: "Heart of the Wolf",
    tagline: "Deux mondes. Une seule nuit pour tout changer.",
    genre: "Fantastique · Romance",
    year: 2025,
    rating: 9.0,
    views: "9,4M",
    poster: "/assets/poster-loup.jpg",
    featured: true,
    trending: 2,
    isNew: true,
    synopsis:
      "Lorsqu'elle s'enfuit dans la forêt la nuit de sa propre cérémonie de mariage, Maëlys croise le chemin d'Arkan, le chef redouté de la meute du nord. Ce qu'elle ignore : ses yeux ambrés la trahissent — elle porte le sang ancien que les clans chassent depuis des siècles.",
    cast: ["Maëlys", "Arkan", "Soren", "Lyra"],
    tags: ["loup-garou", "destin", "clans", "amour interdit"],
    episodes: [
      { n: 1, title: "La fugue", duration: "12:10", seconds: 730, synopsis: "Une mariée en fuite, une meute en éveil, et une lune qui ne pardonne pas.", video: cycle([V.escapes])[0], free: true },
      { n: 2, title: "Les yeux ambrés", duration: "11:05", seconds: 665, synopsis: "Arkan reconnaît en Maëlys la marque disparue depuis un siècle.", video: cycle([V.escapes])[0], free: true },
      { n: 3, title: "Le rituel", duration: "13:22", seconds: 802, synopsis: "Pour la protéger, Arkan doit enfreindre la première loi de la meute.", video: cycle([V.escapes])[0] },
      { n: 4, title: "Première transformation", duration: "12:48", seconds: 768, synopsis: "Le sang ancien se réveille — et toute la forêt s'en souvient.", video: cycle([V.escapes])[0] },
    ],
  },
  {
    id: "vengeance-en-talons",
    title: "Vengeance en Talons",
    originalTitle: "Revenge in Heels",
    tagline: "Elle a troqué sa robe de mariée contre une robe de combat.",
    genre: "Thriller · Revenge",
    year: 2024,
    rating: 8.8,
    views: "15,1M",
    poster: "",
    art: true,
    trending: 3,
    synopsis:
      "Abandonnée à l'autel et ruinée par ceux qu'elle aimait, Stella Vane disparaît trois ans. Elle réapparaît au gala de charité de sa pire ennemie, invitée mystère, silhouette de feu. Chaque verre levé est une pièce d'échec, chaque danse un pas vers la chute des traîtres.",
    cast: ["Stella Vane", "Julian Cross", "Bianca Roth", "Daniel Cho"],
    tags: ["vengeance", "trahison", "gala", "reconstruction"],
    episodes: [
      { n: 1, title: "Le retour de Stella", duration: "10:56", seconds: 656, synopsis: "Personne ne l'a reconnue. Tout le monde va le regretter.", video: cycle([V.fun])[0], free: true },
      { n: 2, title: "Une invitation", duration: "11:30", seconds: 690, synopsis: "Stella place son premier pion : la confiance de Julian Cross.", video: cycle([V.fun])[0], free: true },
      { n: 3, title: "Verre empoisonné", duration: "12:14", seconds: 734, synopsis: "Un toast, une accusation, et le premier mur qui s'effondre.", video: cycle([V.fun])[0] },
      { n: 4, title: "Confession enflammée", duration: "11:02", seconds: 662, synopsis: "Bianca tient un journal. Stella le lit. La ville tremble.", video: cycle([V.fun])[0] },
    ],
  },
  {
    id: "pacte-mafia",
    title: "Le Pacte de la Mafia",
    originalTitle: "The Pact",
    tagline: "Il a signé pour trois ans. Son cœur n'était pas au contrat.",
    genre: "Crime · Romance",
    year: 2025,
    rating: 8.9,
    views: "11,2M",
    poster: "",
    art: true,
    trending: 4,
    isNew: true,
    synopsis:
      "Pour éponger les dettes de son frère, Léo accepte de servir Dante Moretti, parrain de la côte est, pendant trois ans. Entrepôts froids, silences lourds, règles absolues — mais la règle numéro un est de ne jamais regarder Sofia, la sœur du patron, comme il la regarde.",
    cast: ["Léo Marchand", "Dante Moretti", "Sofia Moretti", "Yannick"],
    tags: ["mafia", "pacte", "interdit", "loyauté"],
    episodes: [
      { n: 1, title: "La signature", duration: "12:40", seconds: 760, synopsis: "Un stylo, un contrat, et Léo cesse d'appartenir à lui-même.", video: cycle([V.joyrides])[0], free: true },
      { n: 2, title: "Règle numéro un", duration: "11:18", seconds: 678, synopsis: "Première nuit d'entrepôt. Première rencontre interdite.", video: cycle([V.joyrides])[0], free: true },
      { n: 3, title: "Le bouc émissaire", duration: "12:55", seconds: 775, synopsis: "Un rat dans l'organisation. Dante exige un nom avant l'aube.", video: cycle([V.joyrides])[0] },
      { n: 4, title: "Feu sous la cendre", duration: "13:06", seconds: 786, synopsis: "Sofia connaît le secret de Léo. Elle n'a pas encore décidé quoi en faire.", video: cycle([V.joyrides])[0] },
    ],
  },
  {
    id: "ceo-inconnu",
    title: "CEO Inconnu",
    originalTitle: "The Unknown CEO",
    tagline: "Le stagiaire le plus gentil de l'étage est aussi votre nouveau patron.",
    genre: "Romance · Corporate",
    year: 2024,
    rating: 8.6,
    views: "18,7M",
    poster: "",
    art: true,
    trending: 5,
    synopsis:
      "Pour démasquer les malversations de ses propres dirigeants, Nathan Yu rejoint sa propre entreprise en tant que simple stagiaire. Seule Nadia, assistante débordée et incorruptible, le traite comme un humain. Problème : elle déteste le PDG qu'elle n'a jamais vu — celui qu'il est.",
    cast: ["Nathan Yu", "Nadia Benali", "Claire Fontaine", "Hugo Devaux"],
    tags: ["secret d'identité", "bureau", "comédie romantique"],
    episodes: [
      { n: 1, title: "Jour 1 au bureau 12B", duration: "10:44", seconds: 644, synopsis: "Nathan découvre que son badge ne fonctionne nulle part. Sauf dans le cœur de Nadia.", video: cycle([V.meltdowns])[0], free: true },
      { n: 2, title: "Café renversé", duration: "11:12", seconds: 672, synopsis: "Un café brûlant, des excuses maladroites, une complicité inattendue.", video: cycle([V.meltdowns])[0], free: true },
      { n: 3, title: "La réunion des loups", duration: "12:26", seconds: 746, synopsis: "Les cadres complotent contre le mystérieux PDG absent.", video: cycle([V.meltdowns])[0] },
      { n: 4, title: "Révélation express", duration: "13:40", seconds: 820, synopsis: "L'ascenseur bloqué. Un appel en haut-parleur. Le masque tombe.", video: cycle([V.meltdowns])[0] },
    ],
  },
  {
    id: "retour-1999",
    title: "Retour à 1999",
    originalTitle: "Back to 1999",
    tagline: "Une seconde chance de 20 ans. Une seule règle : ne rien changer. Ou tout changer.",
    genre: "Science-fiction · Romance",
    year: 2025,
    rating: 9.1,
    views: "7,9M",
    poster: "",
    art: true,
    featured: true,
    isNew: true,
    synopsis:
      "La nuit de son trente-huitième anniversaire, Antoine se réveille le matin du 14 juillet 1999, avec tous ses souvenirs intacts. Son père est encore là. Lila est encore là. Mais chaque choix qu'il modifie réécrit le présent — et certaines choses refusent d'être sauvées.",
    cast: ["Antoine", "Lila Moreau", "Le Père", "Samir"],
    tags: ["voyage temporel", "nostalgie", "seconde chance"],
    episodes: [
      { n: 1, title: "Réveil en 1999", duration: "12:02", seconds: 722, synopsis: "Des cassettes, un Minitel, et dans le miroir : un visage de 18 ans.", video: cycle([V.bunny])[0], free: true },
      { n: 2, title: "Le 14 juillet", duration: "11:36", seconds: 696, synopsis: "Le feu d'artifice, le baiser manqué, et le premier paradoxe.", video: cycle([V.bunny])[0], free: true },
      { n: 3, title: "Ne rien changer", duration: "12:58", seconds: 778, synopsis: "Antoine teste les limites du passé. Le passé répond.", video: cycle([V.bunny])[0] },
      { n: 4, title: "L'effet papillon", duration: "13:21", seconds: 801, synopsis: "Une photo de classe différencée déclenche une tornade d'altérations.", video: cycle([V.bunny])[0] },
    ],
  },
  {
    id: "cendrillon-ceo",
    title: "Cendrillon CEO",
    originalTitle: "Cinderella CEO",
    tagline: "Elle nettoyait leurs bureaux. Ils ignoraient qu'elle allait leur acheter la tour.",
    genre: "Romance · Ascension",
    year: 2024,
    rating: 8.7,
    views: "14,3M",
    poster: "",
    art: true,
    synopsis:
      "Femme de ménage de nuit dans la tour Morel, Aïcha traduit en secret des documents stratégiques qu'elle découvre dans les poubelles des cadres. Trois ans plus tard, elle revient — non avec un balai, mais avec un portefeuille d'investissements et un plan pour chacun d'eux.",
    cast: ["Aïcha Koné", "Raphaël Morel", "Ingrid", "Karim"],
    tags: ["ascension", "rags-to-riches", "corporate"],
    episodes: [
      { n: 1, title: "Minuit au bureau", duration: "11:08", seconds: 668, synopsis: "Le dernier étage, la dernière poubelle, le premier secret.", video: cycle([V.dream])[0], free: true },
      { n: 2, title: "La proposition", duration: "12:20", seconds: 740, synopsis: "Un investisseur fantôme rachète la dette de la tour Morel.", video: cycle([V.dream])[0], free: true },
      { n: 3, title: "Bal masqué", duration: "12:44", seconds: 764, synopsis: "Au gala annuel, Aïcha apparaît. Personne ne sait qui elle est. Tout le monde va le découvrir.", video: cycle([V.dream])[0] },
      { n: 4, title: "La chaussure de verre", duration: "11:52", seconds: 712, synopsis: "Raphaël suit la seule piste : une clé USB oubliée dans une paire de baskets.", video: cycle([V.dream])[0] },
    ],
  },
  {
    id: "serment-minuit",
    title: "Le Serment de Minuit",
    originalTitle: "The Midnight Oath",
    tagline: "Chaque nuit, il sauve des vies. Chaque nuit, il en perd un peu lui-même.",
    genre: "Médical · Drame",
    year: 2024,
    rating: 8.9,
    views: "10,6M",
    poster: "",
    art: true,
    synopsis:
      "Chirurgien de garde au CHU Saint-Lazare, le Dr Élias Renard n'a pas fermé l'œil depuis l'accident qui a coûté la mobilité de sa fille. Lorsqu'une jeune interne, Impétueuse et brillante, découvre qu'il opère malgré des troubles du sommeil avérés, elle doit choisir entre le dénoncer ou le sauver.",
    cast: ["Dr Élias Renard", "Dr Nora Haddad", "Le Professeur Vale", "Anna"],
    tags: ["hôpital", "éthique", "rédemption"],
    episodes: [
      { n: 1, title: "Garde de nuit", duration: "13:12", seconds: 792, synopsis: "Un étage, quatorze patients, zéro marge d'erreur.", video: cycle([V.sintel])[0], free: true },
      { n: 2, title: "Salle 4", duration: "12:30", seconds: 750, synopsis: "Nora repère la main tremblante d'Élias derrière le masque.", video: cycle([V.sintel])[0], free: true },
      { n: 3, title: "Le serment", duration: "11:58", seconds: 718, synopsis: "Primum non nocere — mais que signifie « ne pas nuire » quand tout est gris ?", video: cycle([V.sintel])[0] },
      { n: 4, title: "Code noir", duration: "13:44", seconds: 824, synopsis: "Un crash d'étage complet force Élias à affronter son pire ennemi : lui-même.", video: cycle([V.sintel])[0] },
    ],
  },
  {
    id: "epouse-milliardaire",
    title: "L'Épouse du Milliardaire",
    originalTitle: "The Billionaire's Wife",
    tagline: "Un mariage de convenance. Un cœur devenu très inconvenant.",
    genre: "Romance · Contrat",
    year: 2025,
    rating: 8.5,
    views: "16,9M",
    poster: "",
    art: true,
    trending: 6,
    isNew: true,
    synopsis:
      "Pour hériter, Alexandre doit être marié avant ses trente ans. Pour soigner sa mère, Camille a besoin d'une somme impossible. Un contrat clair, douze mois, zéro sentiment. Mais le cœur, paraît-il, n'a jamais lu de contrat — et les clauses se réécrivent la nuit.",
    cast: ["Camille", "Alexandre Vasseur", "Grand-mère Odette", "Thomas"],
    tags: ["mariage de convenance", "contrat", "amour"],
    episodes: [
      { n: 1, title: "La clause 7", duration: "11:26", seconds: 686, synopsis: "Douze pages, vingt-six clauses, une signature tremblée.", video: cycle([V.tears])[0], free: true },
      { n: 2, title: "Première nuit au manoir", duration: "12:08", seconds: 728, synopsis: "Deux verrouillés de chaque côté du couloir. Un règlement à réécrire.", video: cycle([V.tears])[0], free: true },
      { n: 3, title: "La grand-mère Odette", duration: "11:50", seconds: 710, synopsis: "La matriache voit tout. Surtout ce que les mariés refusent de voir.", video: cycle([V.tears])[0] },
      { n: 4, title: "Annulation impossible", duration: "12:32", seconds: 752, synopsis: "Un article oublié du contrat vient compliquer la fin prévue.", video: cycle([V.tears])[0] },
    ],
  },
  {
    id: "menteur-magnifique",
    title: "Le Menteur Magnifique",
    originalTitle: "The Magnificent Liar",
    tagline: "Il peut voler n'importe quoi. Sauf son propre passé.",
    genre: "Thriller · Arnaque",
    year: 2024,
    rating: 8.4,
    views: "8,8M",
    poster: "",
    art: true,
    synopsis:
      "Élève prodige d'un père escroc, Cassius peut faire croire n'importe quoi à n'importe qui — jusqu'au jour où une mystérieuse héritière lui commande l'impossible : lui-même, rendu honnête. Dernière arnaque, première vérité. S'il échoue, c'est sa vie qui est en jeu.",
    cast: ["Cassius", "Isabella March", "Le Régent", "Momo"],
    tags: ["arnaque", "casino", "double jeu"],
    episodes: [
      { n: 1, title: "Trois cartes", duration: "11:14", seconds: 674, synopsis: "Une partie, un adversaire, et une mise que Cassius ne peut pas refuser.", video: cycle([V.subaru])[0], free: true },
      { n: 2, title: "La commande", duration: "12:36", seconds: 756, synopsis: "Isabella March achète six mois de la vie de Cassius. Comptant.", video: cycle([V.subaru])[0], free: true },
      { n: 3, title: "Le Régent", duration: "12:04", seconds: 724, synopsis: "Le vieil homme qui a formé son père revient réclamer sa dette.", video: cycle([V.subaru])[0] },
      { n: 4, title: "Dernière manche", duration: "13:18", seconds: 798, synopsis: "Un bluff final où tout est vrai. Ou tout est faux.", video: cycle([V.subaru])[0] },
    ],
  },
];

export const GENRES = [...new Set(DRAMAS.map((d) => d.genre.split("·")[0].trim()))];

export const byId = (id: string) => DRAMAS.find((d) => d.id === id);
