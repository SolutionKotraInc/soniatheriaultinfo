import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin once
gsap.registerPlugin(ScrollTrigger);

/*
 * Données de base pour le site. Les textes sont volontairement longs et sont
 * affichés de manière compacte. L'utilisateur peut cliquer sur un titre pour
 * lire l’intégralité du contenu.
 */

const PRICES = [
  {
    title: "Consultation privée",
    options: [
      { duration: "60 minutes", price: "90$" },
      { duration: "90 minutes", price: "135$" },
      { duration: "120 minutes", price: "180$" },
    ],
  },
  {
    title: "Consultation à deux",
    options: [
      { duration: "60 minutes", price: "110$" },
      { duration: "90 minutes", price: "165$" },
      { duration: "120 minutes", price: "220$" },
    ],
  },
  {
    title: "Soin énergétique intuitif",
    options: [
      { duration: "60 minutes", price: "90$" },
      { duration: "90 minutes", price: "135$" },
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Carole L.",
    text: `Ma belle Sonia... Avec ton aide si précieuse, ma vie a changé complètement! Ma première visite chez toi était d’apprendre à être bien seule... Dans cette belle démarche, j’ai appris tant de choses, à être bien seule évidemment, mais surtout à me respecter, à m’aimer et à devenir ma précieuse amie!! Je t’en suis si reconnaissante! Ce n’est pas tout, tu m’as aussi aidée à me respecter en relation avec les autres et à trouver les bons mots afin de bien m’exprimer tout en me respectant! J’ai appris tellement plus sur moi, de savoir accueillir ma colère, ma peine, ma peur, ma boule de stress... et de leur faire une belle place auprès de moi! Et aussi, de m’accepter telle que je suis car je suis parfaite ainsi. Sonia tu es un baume sur mon cœur et un rayon de soleil à chaque instant! Je n’ai pas fini de te remercier encore et encore pour toute ta guidance!!! Tu es merveilleuse et extraordinaire petite fée magique. Continue ton beau travail, tu fais tellement de bien autour de toi!!! Je t’aime fort.`,
  },
  {
    name: "M. P. & Mme S.",
    text: `Sonia Thériault est la meilleure thérapeute que nous ayons eue. Nous avons été la voir pour des rencontres individuelles et des consultations de couple à plusieurs reprises. Dès notre premier contact, elle nous a mis à l’aise et nous a écoutés sans jugement. Nous nous sommes sentis compris. Elle a une grande capacité d’analyser la situation et de donner de bons conseils pour vous aider à avancer. Son énergie débordante, son humour, sa compréhension, son écoute, ses conseils font d’elle une thérapeute que nous recommandons fortement. Elle fera une différence dans votre vie!`,
  },
  {
    name: "Evelyn S‑P.",
    text: `Depuis que je vois Sonia je me sens BIEN. Mes maux physiques ont disparu et lorsque qu'ils reviennent je sais que mes choix ne sont pas bons pour moi. Sonia est comme une lumière qui éclaire notre chemin afin d'être bien avec soi même. Toujours à l'écoute et dans le respect Sonia est l'exemple même de la simplicité et de l'amour. Tu as changé ma vie et tu continues de le faire. Je t'adore Sonia je ne peux plus me passer de toi.`,
  },
  {
    name: "Gabrielle C.",
    text: `Dès la première rencontre, j’ai été frappée par la douceur et le franc parler de Sonia. Nos rencontres m’ont aidée à revenir à moi et à mieux gérer mon quotidien. Je recommande à tous un essai.`,
  },
  {
    name: "Pascal H.",
    text: `Je suis allé voir Sonia pour régler certains désaccords entre ma femme et moi. Elle m'a donné des moyens pour voir la situation d'une façon différente, de comprendre les besoins de l'autre. Il y avait beaucoup de choses que je ne comprenais pas complètement. Maintenant, tout cela est réglé et la vie de couple va vraiment mieux. De plus, je suis retourné la voir quelques mois plus tard pour régler quelques problèmes personnels. Cela s'est réglé très vite, car je voulais que cela soit réglé rapidement. J'étais prêt à faire les efforts nécessaires. Ceci étant dit, quand on veut on peut. Avec ce bagage d'informations, je peux affronter d'autres situations beaucoup plus facilement. Le malaise intérieur dure moins longtemps, car Sonia m'a donné les bons outils pour me débarrasser des malaises. Je ne me suis jamais senti jugé. Jamais je n'aurais pensé pouvoir vider toute cette « marde » accumulée depuis bien longtemps. Désolé pour mon langage, je m'aime comme ça!`,
  },
];

/*
 * Liste exhaustive des textes publiés par Sonia. Chaque entrée comprend un titre
 * succinct et un corps de texte complet. Les passages de texte ont été
 * nettoyés pour enlever les références à des fichiers d’image insérés
 * accidentellement dans le texte original.
 */
const TEXTS = [
  {
    title: "Je suis grande!",
    body: `Du haut de mes 4 pieds 10 pouces, je suis tellement grande.

Grande dans la façon dont je m’honore.

Je ne crie pas, je ne me chicane pas, je ne me défends pas. J’observe!

J’observe et je m’ajuste.

Je suis honnête, je suis franche, je suis vraie, je suis dévouée, je suis compréhensive mais loin d’être naïve ou faible.

Je suis une personne de qualité. Je m’honore et t’honore par le fait même, dans le fait de m’assurer que je reste une personne de qualité.

Je ne force personne à me dire la vérité, à m’écouter, à être transparent, à être honnête. Je ne force personne à être autant dévoué que moi, mais je ne suis ni naïve, ni faible.

Je suis une femme. Une grande femme!

Ce genre de femme qui marche la tête haute. Qui n’écrase jamais personne. Qui tend toujours la main à son prochain. Ce genre de femme qui se sait irréprochable.

J'observe et je m’ajuste en conséquence, en restant toujours impeccable.

Je t'aime, Sonia`,
    image: "/portrait.jpg",
  },
  {
    title: "29 ans, 3 enfants et j’ai peur",
    body: `J’ai 29 ans, 3 enfants et j’ai peur.

Peur de tout.

Je veux m’acheter un livre chez Zellers mais j’ai peur…

Peur que mon conjoint soit fâché de cet achat inutile.

Le fait qu’il soit en solde me donne le courage.

J’achète le livre.

Les 5 blessures de l'âme, de Lise Bourbeau.

Ce livre allait changer ma vie.

Je découvre que cette auteure a aussi plusieurs écoles à travers le monde, dont une à Laval.

École pour apprendre à être bien dans sa peau et/ou pour devenir intervenante en relation d’aide.

Je veux secrètement les deux.

Mais je suis apeuré.

Est-ce que j’ai le potentiel d’être bien dans ma peau?

Je suis qui moi pour devenir intervenante?

Et comment faire pour payer cette formation. Je suis maman à la maison.

Donc pauvre.

J’ai peur mais quelque chose pousse fort en moi.

Aucune idée c’est quoi, mais c’est puissant.

Réfléchit Sonia! Dans quoi tu as du talent donc?

LE MÉNAGE!

Je croyais profondément que c’était ma seule qualité.

Triste…

Je deviens alors femme de ménage.

En cachette au début.

J’étais terrorisée à l’idée que ma première cliente ne m’aime pas et que mon plan de retour à l’école tombe à l’eau. J’en parle donc à personne.

Mais cette cliente était très satisfaite.

Ça me donnait juste assez d’argent par mois, pour payer cette formation.

C’était enfin possible.

Je sue en dessous des bras à l’idée de m’inscrire. Je ne me sens pas bien.

De peur et de misère, je m’inscris à l’école de Mme Bourbeau. L’école écoute ton corps.

En cachette, encore.

La peur menait ma vie.

Tellement de peur de tout, qu'au début de cette formation, je dînais soit dans les toilettes, soit dans ma voiture, selon la température extérieure.

J’avais peur de déranger, peur que les autres étudiants me trouvent stupide ou pire, qu’ils me détestent.

Mais non. Je me suis même fait des amis…

… et je réussissais bien…

… ça aussi ça fait peur, la réussite ….

Je gradue de l’école à 33 ans.

Je deviens intervenante en relation d’aide.

Je deviens mieux dans ma peau.

Ça devrait être génial, mais moi, ça me fout la trouille.

Mon mieux-être fait des mécontents.

Je déplais encore….

Je continue pourtant à prendre soin de moi.

Envers et contre certains.

Je deviens plus sûre de moi, plus consciente, confiante et courageuse.

Je veux mettre un terme à cette relation avec mon conjoint des 22 dernières années.

Le père de mes enfants.

Mon seul conjoint à vie.

TERRORISANT.

Cette relation me maintient dans la peur et l’impuissance.

Je n’en veux plus.

Je n’en peux plus.

J’AI PEUR.

Mes enfants vont me détester?

Où je vais aller?

Comment je vais m’en sortir?

Est-ce qu’il va me tuer?

3-2-1, je prends quelques vêtements et je saute en bas du navire.

C’est la seule possibilité.

Mes enfants m'ont ensuite suivi un à un et….

… et le navire a coulé.

Dieu merci, mes enfants ont été épargnés.

J’ai le vertige mais je me sens tellement forte en même temps.

Étrange.

Est-ce que je commence à apprivoiser la peur?

Maintenant, comment je vais rebâtir notre vie sans argent?

Je vais travailler d'arrache-pied!

J’ai peur de craquer. J’ai peur de ne pas y arriver.

Mais je tiens bon.

Malgré ma crainte, j'élimine les choses et les gens qui prennent de mon énergie et qui m'éloignent de ma possibilité de réussir.

J’ai perdu tout ce qui tenait à un fil.

Ce qui était solide, est encore à mes côtés.

J’ai peur de quoi au fond?`,
    image: "/enfantsetpeur.avif",
  },
  {
    title: "40 ans!",
    body: `40 ans!

J’ai moins peur, je pense…

… ou je navigue mieux avec elles?

Bref, je me sens en vie.

Ma vie a enfin un sens précieux à mes yeux.

Mais …

Voilà que vient la peur d’être passé à côté de ma vie.

Je veux vivre, c'est urgent.

J’ai été trop longtemps le témoin de ma propre vie.

Et si je partais en Afrique du sud?

Et si je me permettais de vivre cette folle expédition de survie/psychologie.

Ça crie fort en moi mais…

… je ne parle pas anglais, je n’ai pas les moyens financiers, mes enfants seront seuls, passer 2 semaines avec des gens que je ne connais pas, dormir seule dans la jungle, faire vérifier ma craque de fesse par une inconnue pour être certaine de ne pas être piquée par une tique…

Je suis capable, je le sens.

Pleins de nouvelles expériences. Pleins d'inconnus. Pleins d'apprentissages.

Je fonce, je m’inscris.

Je vis enfin.

Je vis et savoure chaque seconde à 100 000 à l’heure.

La peur ne gère plus ma vie.

Je me sens libre comme l’air.

Suite à cette expédition, une merveilleuse amie me demande: mais comment fais-tu pour n’avoir peur de rien?

Ma réponse: j’ai encore peur mais, j’ai réalisé que la peur c’est mon amie finalement.

Chaque fois que j’arrive à l'apprivoiser, je grandis.

J’augmente la confiance en moi.

Je deviens plus forte et un miracle se produit.

Chaque fois que la peur est là, je sais que je dois y aller si je veux me rapprocher d’une vie qui me correspond.

Je n’ai plus peur d’avoir peur!

Je suis excitée maintenant quand je ressens la peur.

Je sais qu’il y aura des changements.

C’est devenu excitant.

Alors, je fonce.

Qui aurait cru…`,

    image: "/DSC00232.JPG",
  },
  {
    title: "41 ans presque 42",
    body: `Encore moi…

41 ans presque 42.

J’ai 3 enfants, 2 petits-enfants…

… le cœur rempli d’amour.

J’ai tout reconstruit, je vis à fond, je suis libre comme le vent.

J’ai évidemment encore peur, mais…

… ma peur est devenue mon guide pour m'orienter vers la vie de mes rêves.

En date du 27 janvier 2024:

J’ai peur de briller.

Je veux briller, mais j’ai encore peur de déranger.

J’ai peur d'être jugé.

J’ai encore le syndrome de l’imposteur.

J’ai parfois peur d'être trop ou pas assez.

Peur de me tromper.

Peur de ne pas être comprise.

Peur de ne jamais vivre l’amour.

Peur de manquer de temps.

CHAQUE JOUR, je navigue avec ces peurs.

Je les observe un bref moment.

Je valide avec mes valeurs et je fonce.

J’avance avec elles.

Parfois plus doucement, mais j’avance constamment.

Le pire, je l’ai déjà vécu.

Le pire c’est d’être en vie et de se sentir morte de l’intérieur.

Morte de peur.

Plus JAMAIS!

Quatre jours pour te parler de mes peurs et tu es encore là. MERCI.

J'ai failli avoir tellement peur de te déranger que…

… mais,

j’ai osé et je vais continuer d’oser jusqu’à la fin de cette merveilleuse vie.

Je t’encourage bien évidemment à oser faire ce qui te fait vibrer toi aussi, juste pour voir…

Avec tout mon amour & respect,

Sonia Thériault`,
    image: "/noel.jpg",
  },
  {
    title: "La dépendance affective",
    body: `La dépendance affective, ça te dit quelque chose?

Tu sens parfois que tu as absolument BESOIN de l’autre?

Ça t’arrive que l’autre ne veuille pas vraiment être avec toi mais que tu forces la note pour que vous soyez quand même ensemble?

Tu as besoin que l’autre te fasse sentir important(e), beau/belle, indispensable, unique, car sinon tu ne le ressens pas?

Tu sens le besoin de rabaisser l’autre inconsciemment quand tu sens qu’il/elle est mieux que toi, afin d’être absolument au même niveau?

Tu cherches ailleurs quelque chose de mieux, mais que tu restes avec cette personne, en attendant?

Tu lui donnes tout, juste pour que cette personne réalise la chance qu’elle a d’être avec toi?

Tu vis un inconfort quotidien avec cette personne, mais tu restes parce que tu as peur de te retrouver seul?

Ça suffit! Je veux mieux pour toi. Devenir autonome affectivement, c’est tellement plus plaisant pour toi et plus séduisant pour l’autre.

Prends le temps d'observer tes faiblesses et développe ta façon de te combler par toi-même. Bien évidemment tu peux demander l’aide d’un professionnel.

Mais tu peux y arriver avec beaucoup d'honnêteté (dans les faiblesses que tu as) et de détermination à vouloir mettre en action cette autonomie affective.

Tu seras tellement mieux de ne plus avoir BESOIN de l’autre mais HEUREUX d’être avec l’autre.

L’autre est là pour t’aimer pas pour s’occuper de toi, te combler ou te sauver de ton malheur.

Et c’est pareil pour toi!

Bisous, Sonia`,
    image: "/dependance.avif",
  },
  {
    title: "Tous les jours, penser à demain",
    body: `Tous les jours j’essaie de faire en sorte que la femme que je serai dans 5 ans soit fière de ce que j’ai fait pour elle.

Tout ce que j’ai fait aujourd’hui, pour que la vie de Sonia dans 5 ans, soit encore meilleure que la vie de Sonia du 2 avril 2023.

Chaque décision, chaque réponse, chaque opportunité, chaque intuition, chaque désir, chaque action… Tout aura un impact sur mon futur.

Comment je me nourris et ce que je fais faire à mon corps physique, comment j'accueille mes émotions et les gens qui m’en font vivre, de quoi je gave mon mental…

Il y a 5 ans, je me trouvais folle de quitter le père de mes enfants, de lui céder la maison, de partir sans aucun $ en banque, … Mais je savais que la Sonia 2023 serait heureuse de ce choix.

Comment je me débrouillerai ?

Du mieux que je peux, comme d’habitude.

Mille mercis à toi chère Sonia 2018, pour cette vie HALLUCINANTE que tu m’as sagement préparée.

Et toi, tu seras fier(ère) de toi dans 5 ans?

Sonia`,
    image: "/femme5ans.avif",
  },
  {
    title: "L’alcool, mon faux ami",
    body: `L’alcool !

Mon meilleur ami pendant tellement d'années. Si j’ai aimé cette substance. L'alcool m’a permis TELLEMENT!

Il me permettait de me détendre, de me récompenser, de traverser les journées les plus difficiles. Il me donnait du courage, il masquait ma timidité et mon mal-être. Il me donnait la force de continuer quand je n’étais plus capable. D’endurer, tolérer, banaliser, estomper, excuser. Il m’aidait à trouver ça drôle quand ça ne l’était pas, il m’accompagnait et me permettait d’être capable d’endurer des gens qui ne me correspondaient pas du tout. Il me donnait de l’énergie quand j’étais exténué. L’alcool me rendait encore plus drôle, encore plus funny, encore plus cochonne…! C’était génial.

Et tout ça avec le pouvoir de me garder dans le déni total. Déni que c’était l’alcool qui me gardait dans un cercle vicieux. C’est fort le pouvoir de l’alcool. Vraiment fort!

Mais un jour, la vie m'a amené à faire l’expérience de vivre sans alcool. De découvrir qui je suis sans cette substance. Ce que je veux vraiment sans cette béquille et je suis devenue consciente que ce que je nommais ''mon meilleur ami'' était en fait:

extraordinaire pour me garder dans le non respect de moi,

merveilleux pour me faire vivre une vie qui ne me convenait pas du tout,

génial pour m’aider à faire honte à mes parents et à mes enfants,

un aide puissant pour me remplir de remords, de culpabilité et de honte,

un spectaculaire soutien pour m’éloigner de mes rêves, mes projets et de l’authentique Sonia que je suis aujourd’hui,

champion pour m’aider à vider mon compte de banque.

UN EXCELLENT MAUVAIS AMI!

De mettre un terme à notre relation a été un cadeau incroyable. Tout est plus simple depuis la fin de notre relation. Je suis maintenant authentique, cohérente et fière. Je prends la responsabilité de tous mes faits et gestes. Je ne peux plus me cacher derrière la défaite de l'alcool. Les gens qui m’entourent sont des gens de choix et je suis heureuse d’être avec eux. Tout ce que je fais, je le fais parce que je le veux. Je suis dans le respect de moi-même et par le fait même, des autres. Ma confiance en moi est maintenant inébranlable.

Merci l’alcool de m’avoir permis de vivre l’expérience de l’illusion d’une vie merveilleuse. Et toi, abstinence d'alcool, merci infiniment de me faire vivre l’expérience d’une vie VRAIMENT MERVEILLEUSE. Grâce à vous deux, je sais que je ne veux plus vivre dans l’illusion.

Si un jour, tu as eu un moment d’honnêteté avec toi-même, et que tu as pensé que tu consommais trop, je t’aime !

Je te souhaite aujourd’hui, d’avoir l’humilité et assez d’amour de toi pour demander de l’aide et SURTOUT d’avoir le courage de prendre TA vie en mains. Tu mérites de vivre cette vie qui est vraiment destinée pour toi. Courage mon ami(e). Difficile de briser une relation toxique, mais on se sent tellement fier(ère) et libéré quand c’est derrière nous.

Sonia`,
    image: "/alcool.avif",
  },
  {
    title: "Ce matin je te dis la vérité",
    body: `Ce matin je te dis la vérité sur moi.

Parfois je me surprends moi-même à être particulièrement conne et d’autre fois, je me trouve tellement brillante.

Je suis majoritairement très calme mais je suis aussi une “osti de folle”.

J’ai la capacité d’être très sérieuse alors que je ne me prends pas du tout au sérieux.

Je suis saine d’esprit et troublée par moment.

Je suis ultra délicate mais j’ai un côté brutal aussi.

Je suis sensible et insensible à la fois. Selon la situation ou la personne.

Je suis très accueillante et chaleureuse mais quand tu dépasses ma limite, je suis un véritable bloc de glace.

J’ai un grand côté rebelle mais je suis super bonne pour me conformer.

J’aime les foules, les party et les rassemblements mais ma préférence serait d’être seule sur une île déserte.

Il y a toujours de la douce musique de méditation chez moi mais quand je m’entraîne c’est Eminem qui me fait vibrer.

J’adore les côtes levées et la poutine bien grasse mais ma préférence c’est les salades.

Je suis très zen/spirituelle et j’adore faire des jokes de sexe ultra déplacés.

Je suis féminine et j'ai une énergie très masculine.

J’aime infiniment les journées où il n’y a rien d’autre à faire que de RIEN FAIRE et j’aime les journées où l’horaire est bondé de choses à faire.

Je suis authentique et vraie mais il m’arrive d’être bitch et menteuse.

Tu l'auras compris, je suis tout et je ne suis rien. J'accueille toutes ces parties de moi, même les moins belles, car elles font partie de qui je suis.

Je suis une femme, je suis mère, je suis granw-28 h-28 rounded-full object-cover object-center shadow-mdd-mère, je suis amie, je suis thérapeute et je suis une parfaite-imparfaite.

Je suis aimée de certains et détestée par d'autres et c’est parfait!

Dis tout ce que tu veux de moi, je sais que c’est la vérité et un mensonge à la fois.

Maintenant que j'accepte de ne pas plaire à tout le monde (moi incluse), je me laisse libre d'être parfois merveilleuse, parfois merdique. Étrangement, plus je m'accueille dans mes côtés sombres, plus je deviens qui je veux vraiment être.

Je suis Sonia Thériault, la pire personne au monde et la meilleure personne au monde.

Comme TOI mon ami(e).

Je te souhaite donc bonne route à mes côtés ou très loin de moi! Mais je te souhaite surtout de t’aimer même avec tes « défauts ».

Sonia xxxx`,
  },
  {
    title: "Être malheureux est une drogue",
    body: `Tu sais qu’on devient accro à notre vie merdique ?

Être malheureux est une drogue. Spécial, non? Tel un drogué a besoin de sa dose, on finit par avoir grandement besoin de notre malheur.

C’est prouvé scientifiquement, je ne l’invente pas là.

Tu comprends donc pourquoi autant de gens sont malheureux. C’est difficile de sortir de cet enfer. Ça devient notre zone de confort même si elle est extrêmement inconfortable en bout de ligne.

Une fois sortie de cette drogue qu’est le malheur, tout devient tellement plus simple. Tu te sens léger(e), serein(e), fier(e), reconnaissant(e) envers toi-même. Tout devient plus facile et rapide. Ta vie commence alors. Tu sors du brouillard. Tu auras même l'impression d’entrer dans un nouveau monde.

Il y aura quand même des moments difficiles, sache-le! Respire et accueille. Accueille que la souffrance fait partie de la vie. N’essaie plus d’esquiver cette souffrance. Rentre dedans sachant très bien qu’une fois sortie, TOUT sera encore mieux.

Comment se sortir de notre malheur pour entrer dans le nouveau monde?

En changeant à CHAQUE jour tes petites habitudes par des gestes encore plus bénéfiques pour ta vie. En faisant ce que tu n’as jamais fait. Sortir de ta zone de confort à tous les jours.

Et n’arrête J-A-M-A-I-S.

Ouin mais moi j'aime prendre mon verre de vin en arrivant de travailler.

C’est toi qui la vit cette vie médiocre, pas moi. Continue si ça te tente que tout reste comme ça.

Ouin mais ça fait des années que je me lève à 7h00. Pas question que je me lève à 6h00 pour lire ou aller marcher.

Pourtant, ça ne coûte rien de se lever plus tôt pour s’aider, mais si tu aimes ta vie de m@%&*, c’est ok.

Ton mental essaiera de te convaincre que ce n’est pas un bon moment, pas à ton âge, tu mérites de te gâter, pas maintenant mais plutôt le 1er janvier... BLA-BLA-BLA

Rappelle-lui qu’on ne lui a pas demandé son avis ! On veut juste entrer dans l’autre monde. Le monde où on se sent fier, comblé, serein, heureux et même excité de se lever le matin.

On commence par quoi? À moins que tu aies encore besoin de ta dose?

Affectueusement, Sonia`,
    image: "/accroviemerdique.avif",
  },
  {
    title: "L’humain que tu aimes et le changement",
    body: `L’humain que tu aimes, te promet de changer mais….

Te promet d’arrêter ou de commencer et pourtant….

Jure qu’il veut s’améliorer alors que c’est le statu quo ou presque…

Les années passent et cette personne essaie de changer un bref moment mais sans grand résultat. On ressent qu’au fond d’elle, que ce changement ne vient pas de son cœur et de SON désir à elle. Que cet humain voudrait te plaire et il se rend bien compte que ce n'est pas l’idéal: ses décisions, actions, rythme de vie, comportements, mais il revient toujours à la case départ (étant affilié à cette personne, tu reviens toi aussi à cette foutue case départ).

Il fait peut-être, égoïstement, juste assez de changements, pour te donner espoir et ainsi te garder à ses côtés. Tu y as pensé?

Je te propose 2 choses:

1 : accepte qu’il ne peut pas changer et que tu fais le choix de vivre avec ce que tu n’aimes pas et de l’aimer sans jugement.

2 : accepte qu’il ne veut pas changer et que c’est à toi de faire les actions pour avancer et ne plus vivre ce qui te dérange.

SVP, ne reste pas dans l’impuissance, la colère, la frustration, la déception, la peine, l'attente ou l'espoir naïf que tout change (surtout si tu n’as aucune preuve concrète de réel désir de changement autre que ses promesses).

N’oublie jamais que la vie va vite. Aime toi assez pour CHOISIR de ne pas perdre ton temps précieux dans la frustration, la déception, l'insatisfaction,....

Je t’aime, Sonia`,
  },
  {
    title: "Semer pour récolter",
    body: `Je me rappelle comme si c’était hier, de cette semaine de juillet 2017, où il y a eu un seul nom dans mon horaire pour toute la semaine.

Tu fais comment pour payer tes comptes à un client dans ta semaine?

Je me suis demandé si j'abandonnais tout. Si ça ne serait pas préférable d’avoir “une vraie job” genre chez Costco, avec des avantages sociaux, REER et des vacances payées.

Mais, je sais comment je suis merdique quand je fais ce qui ne me passionne pas. Ce n’était donc pas une option pour moi mais une simple réflexion remplie de peur.

C’est devenu hors de question qu’il y ait une autre option. J’ai conclu à ce moment qu’il n’y aurait jamais d’autre option que de réussir. Et je me suis mise à semer. Semer à tous les jours des actions pour réussir. Tous les jours j’ai donné mon 110 %. Je me suis investie à 110 %. Et oui, j’ai aussi utilisé ma carte de crédit à 110 %.

Je me suis dit que cette semaine à un client, était une vacance de la vie, puisque moi, je ne me serais jamais permise. Et j’ai dit: merci la vie !

Ce matin de juillet 2023, j'ai réalisé que mon jardin était plein ! J’ai même des débordements d’abondance de tous genres qui viennent à moi. Ça me rend émotive à chaque fois. Je n'arrive pas à croire que j’ai semé autant et que la récolte a un goût de bonheur aussi intense.

Sème mon ami(e) et n’arrête JAMAIS. Patience, les résultats arriveront, pas demain, mais ils arriveront.

PS: Ma carte de crédit va maintenant très bien.

Bon week-end, Sonia`,
  },
  {
    title: "Ma chérie",
    body: `Ma chérie,

Un jour, il y aura des amis qui t'aimeront pour ce que tu es et d'autres te détesteront pour la même raison. Ils ont le droit.

Un jour, tu plairas à certaines personnes et le lendemain tu déplairas à ces mêmes personnes. C’est parfait ainsi. Ça fait partie de la vie.

Un jour, tu seras une héroïne pour certains et pour cette raison, tu seras la cible des pires méchancetés par les plus souffrants. Ça prend de tout pour faire un monde.

Un jour, tes parents seront tellement fiers de toi et le lendemain, tu les décevras cruellement. Ce sera leur problème, si toi, tu sens que tu as fait ce qui était juste et bon pour toi.

Grand-maman voudrait que tu saches que ce que les autres vivent par rapport à toi, ça les regarde eux et non toi ma poulette.

Je voudrais que tu marches toujours la tête haute, remplie de fierté d’être dans ton authenticité, même quand ça déplaira. Parce que déplaire ne sera jamais ton intention. Ton ultime but sera d'expérimenter TA vie comme ton cœur te le dit.

Ça fera des jaloux car peu de gens se le permettent. Mais là encore, ce n’est pas ton problème.

Allez ma chérie, la tête haute malgré tout, rien de moins. Grand-maman sera toujours là pour les moments où tu auras envie de baisser les bras et d’être autre chose que TOI.

Je t’aime`,
  },
  {
    title: "Je me pardonne",
    body: `Je te pardonne Sébastien!

C’était le titre d’origine.

Et j’ai réalisé que je n’aurais jamais dû t'accuser puisque J’AI fait le choix de rester, donc d’accepter le tout.

De t’accuser, serait de donner encore beaucoup trop de pouvoir.

Tu n’y étais pour rien au fond. C’est moi qui ne m’aimais pas assez. Donc je suis restée.

Ce texte devient alors:

Je me pardonne!

Je me pardonne de t'avoir accusé.

Je me pardonne de ne pas m’être aimée avant.

Ça m’aura pris 5 ans et des poussières à arriver à faire ce que je fais dans l’instant présent, avec sincérité et tout mon cœur.

J’y suis enfin parvenue.

Parvenue à penser à toi sans que mon système nerveux ne s'active. Parvenue à penser à toi et ressentir un amour profond. Parvenue à penser aux bons moments vécus tous ensemble et avoir un sourire aux lèvres et quelques larmes de bonheur sur mes joues.

Je te revois dans ces moments où tu as tenu chacun de nos enfants pour la première fois dans tes bras. La fierté dans tes yeux était palpable.

Je me rappelle comment tu étais bon pour réconforter, écouter et t'intéresser à la vie de notre princesse.

Comment tu étais merveilleux pour amuser les gars dans des combats d’épées, de boxe et que dire de toutes ces heures investies dans leur hockey.

Je ris quand je pense à ces samedis matin de fous rires à faire des guerres d’oreiller et à jouer au rouleau compresseur.

Merci pour ta folie et ta joie de vivre qui a marqué nos enfants, neveux et nièces, voisins et amis. Merci pour le père que tu as été. Merci pour tous ces moments mémorables que tu nous as fait vivre. Merci profondément de m’avoir permis de voir mes enfants grandir et de pouvoir les éduquer moi-même. Merci pour ces magnifiques enfants.

Pour tout le reste, je n’aurais jamais dû tolérer. Mais je l’ai fait, ça devient donc mon sort. Mais je me pardonne.

Je n’ai pas oublié. Je n’ai rien oublié. Je ne pourrais jamais oublier.

Je suis maintenant en paix avec cette histoire qui est la nôtre.

Je m’aime maintenant assez pour aimer ce que tu as été, qui m’a aussi permis d’être ce que je suis aujourd’hui.

Merci pour ton passage dans ma vie.

Mon ami(e), par amour pour toi, pardonne.

Pardonner ne veut pas dire oublier. Surtout pas recommencer.

C’est un long processus le pardon, mais si tu commences doucement à moins parler de ce qui est arrivé d'impardonnable, à stopper volontairement tes pensées quand ton mental veut revivre les scènes inacceptables, et prendre ta part de responsabilité, ça sera un bon début.

Le début de TA libération.

Peu importe ce qu’il y a à pardonner, PARDONNE parce que tu t’aimes toi et que tu veux te libérer toi.

Je t’aime même si tu n’y arrives pas tous les jours.

Sonia`,

    image: "/New Project.jpg",
  },
  {
    title: "Je n’ai pas de maison coquette",
    body: `Je n’ai pas de maison coquette,

je ne suis pas riche,

je n’ai pas rencontré l’homme de mes rêves,

je n’ai pas de papa pour m’aider avec mes enfants,

je ne vais pas dans les grands restaurants,

je ne fais pas de voyage dans le sud à chaque année,

je n’ai pas de magnifique terrassement avec piscine, spa et hamac,

je n’ai pas pris de vacances cet été,

mais…..

Je me surprends à verser des larmes de bonheur tellement je me sens heureuse.

Tous les jours, même si c’est lundi de congé et que je travaille! Heureuse partout, même dans l'inconfort.

Quand tu seras décidé à être heureux(se), que tu le feras vraiment pour toi, tu y découvriras un feeling majestueux, magique et durable.

1 000x meilleur que n’importe quel bon vin!

Lâches-toi pas mon ami(e), Sonia`,

    image: "/maison.avif",
  },
  {
    title: "Dire ce que je ressens",
    body: `J’ai si souvent eu peur de dire ce que je ressens au plus profond de moi. Peur de dire ma vérité, mes valeurs, ma définition du respect, mes goûts, mes désirs, mes besoins.

Peur de sembler égocentrique.

Peur de blesser les gens.

Peur d’être moins aimée.

Je voulais être une bonne fille, une gentille fille. Et une bonne fille ne blesse pas les gens.

Je me taisais pour ne pas blesser les gens, jusqu’au jour où j'ai réalisé que je me blessais moi à taire la vérité sur ce que je ressens.

Ça me faisait vivre tellement d'inconfort de ne pas dire:

je ne veux pas aller dans ce genre de soirée car

je n’ai aucun plaisir,

ce genre de relation ne me convient plus,

je ne veux pas que tu me parles comme ça,

pas aujourd’hui car je préfère être seule,

les gens qui viennent chez moi sont des gens de qualité, si tu n’es pas capable de t’y ajuster, je vais te demander de quitter,

je ne veux pas,

je ne t’aime plus,

….

J’avais oublié que je comptais aussi dans cette histoire qu’est ma vie.

Le personnage principal dans les films a toujours une grande importance.

Eh bien ça donne que je suis le personnage principal de mon film, de ma vie! Et toi aussi.

Je ne dis pas de commencer à dire ta façon de penser aux gens qui t’entourent. Mais quand tu es incommodé, mal à l’aise ou même blessé par eux, dis la vérité sur ce que tu ressens. La vérité sur ce que tu veux et ne veux pas. Pour que tu sois bien toi aussi dans l’histoire.

Je ne veux plus être bonne.

Je veux être bien. Et toi?

Bonne semaine humain merveilleux, Sonia`,
  },
];

/*
 * Hook pour gérer le scroll fluide vers des ancres. Il intercepte les clics
 * sur les liens commençant par "#" et déclenche un scroll doux vers la section
 * correspondante. Si aucune section n’existe avec l’ID fourni, rien ne se
 * produit.
 */
function useAnchorSmoothScroll() {
  useEffect(() => {
    const handler = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#" || id.startsWith("http")) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
}

/*
 * Hook pour animer un élément à son apparition dans le viewport. Par défaut,
 * l’élément apparaîtra avec une légère translation vers le bas et une
 * opacité croissante. On utilise ScrollTrigger pour déclencher
 * l’animation lorsque l’élément entre dans le viewport.
 */
function useGsapReveal(ref, options = {}) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const ctx = gsap.context(() => {
      gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        ...options,
      });
    });
    return () => ctx.revert();
  }, [ref, options]);
}

/*
 * Conteneur central pour contraindre la largeur du contenu.
 */
const Container = ({ children }) => (
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

/*
 * En-tête du site. Affiche une photo de Sonia avec son nom et un menu de
 * navigation. Un bouton "Réserver en ligne" redirige vers la plateforme de
 * réservation.
 */
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-taupe/30 backdrop-blur bg-white/80">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/portrait.jpg"
              alt="Portrait de Sonia Thériault"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-sage"
            />
            <div className="leading-tight">
              <p className="font-semibold tracking-wide text-taupe">
                Sonia Thériault
              </p>
              <p className="text-xs text-sage">
                Intervenante en relation d’aide
              </p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#accueil" className="hover:text-sage">
              Accueil
            </a>
            <a href="#rdv" className="hover:text-sage">
              Rendez-vous
            </a>
            <a href="#textes" className="hover:text-sage">
              Textes
            </a>
            <a href="#temoignages" className="hover:text-sage">
              Témoignages
            </a>
            <a href="#contact" className="hover:text-sage">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="https://sonia-thriault.square.site/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-block rounded-full border border-taupe px-4 py-2 text-sm font-medium text-taupe hover:bg-sage hover:text-white transition"
            >
              Réserver en ligne
            </a>
            <button
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-taupe/40"
              onClick={() => setOpen(!open)}
              aria-label="Ouvrir le menu"
            >
              <span className="i-lucide-menu h-5 w-5" />
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden pb-4">
            <div className="grid gap-2 text-sm">
              {[
                { href: "#accueil", label: "Accueil" },
                { href: "#rdv", label: "Rendez-vous" },
                { href: "#textes", label: "Textes" },
                { href: "#temoignages", label: "Témoignages" },
                { href: "#contact", label: "Contact" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded px-3 py-2 hover:bg-sage/10"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://sonia-thriault.square.site/"
                target="_blank"
                rel="noreferrer"
                className="rounded px-3 py-2 text-sage hover:bg-sage/10"
              >
                Réserver en ligne
              </a>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

/*
 * Section héroïque d’accueil. Présente le message principal et les appels à
 * l’action. Une image illustre l’ambiance du site.
 */
function Hero() {
  const ref = useRef(null);
  useGsapReveal(ref, { y: 80, duration: 1.2 });
  return (
    <section id="accueil" ref={ref} className="relative">
      <div className="absolute inset-0 -z-10 bg-sage/10" />
      <Container>
        <div className="grid items-center gap-8 py-16 md:grid-cols-2 md:py-24">
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl text-taupe">
              Reprends ta place dans
              <br />
              <span className="text-sage underline decoration-sage/40">
                TA vie
              </span>
            </h1>
            <p className="text-lg text-dark max-w-prose">
              Deviens le leader de ta vie, dans chaque aspect qui te tient
              vraiment à cœur. Je suis là pour t’aider à te libérer des chaînes
              invisibles et retrouver ton pouvoir.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <a
                href="https://sonia-thriault.square.site/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-sage px-5 py-3 font-medium text-white hover:opacity-90"
              >
                Prendre rendez-vous
              </a>
              <a
                href="#textes"
                className="rounded-full border border-taupe px-5 py-3 font-medium text-taupe hover:bg-taupe hover:text-white"
              >
                Lire mes textes
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="ml-40 w-64 overflow-hidden sm:item-start rounded-3xl shadow-xl ring-1 ring-black/5">
                <img
                  src="/DSC00134.JPG"
                  alt="Portrait"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/*
 * Section de réservation et de présentation des tarifs. Explique comment
 * fonctionne la première rencontre et détaille les différentes offres.
 */
function Booking() {
  const ref = useRef(null);
  useGsapReveal(ref);
  return (
    <section id="rdv" ref={ref} className="py-16 md:py-24">
      <Container>
        <div className="mx-auto grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-taupe">
              Pour prendre rendez‑vous, par ici…
            </h2>
            <p className="text-dark">
              On ne se connaît pas encore? J’ai tellement hâte de faire ta
              connaissance !
            </p>
            <div className="rounded-2xl border border-taupe/30 bg-white p-6 shadow-sm">
              <p className="font-medium text-taupe">Première rencontre</p>
              <p className="mt-1 text-sm text-dark">Durée 1h30 — Tarif 135 $</p>
              <p className="mt-4 text-sm text-dark">
                Après la prise de ton premier rendez‑vous, je prendrai
                personnellement contact avec toi pour un premier échange et pour
                te transmettre les informations essentielles à notre rencontre.
              </p>
              <p className="mt-4 text-sm italic text-gray-600">
                À très bientôt, Sonia
              </p>
              <a
                href="https://sonia-thriault.square.site/"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block rounded-full bg-sage px-5 py-3 font-medium text-white hover:opacity-90"
              >
                Réserver maintenant
              </a>
            </div>
            <div className="rounded-2xl border border-taupe/30 bg-sage/10 p-6">
              <p className="font-medium text-taupe">Politique d’annulation</p>
              <p className="mt-2 text-sm text-dark">
                Si jamais tu oublies d’annuler ton rendez‑vous lors de ta
                confirmation de la veille, c’est ok ! Tout le monde a droit à
                une chance. Cependant, pour reprendre un futur rendez‑vous, tu
                devras envoyer le montant total de la séance avant l’inscription
                à l’horaire. En cas d’oubli répété, ce montant sera conservé
                comme dédommagement.
              </p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-2xl font-semibold text-taupe">Tarifs</h3>
            <div className="grid gap-4">
              {PRICES.map((g) => (
                <div
                  key={g.title}
                  className="rounded-2xl border border-taupe/30 bg-white p-5"
                >
                  <p className="font-medium text-taupe">{g.title}</p>
                  <ul className="mt-2 grid gap-2">
                    {g.options.map((o) => (
                      <li
                        key={o.duration}
                        className="flex items-center justify-between text-sm text-dark"
                      >
                        <span>{o.duration}</span>
                        <span className="font-medium">{o.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="rounded-2xl border border-taupe/30 bg-white p-5">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.avif"
                    alt="ANN"
                    className="h-10 w-10 object-contain"
                  />
                  <div>
                    <p className="text-sm font-medium text-taupe">
                      Membre 16‑6139 — ACNN
                    </p>
                    <a
                      href="https://www.acnn.ca/fr/repertoires/membres/"
                      target="_blank"
                      rel="noreferrer"
                      https:className="text-xs text-sage underline" //www.facebook.com/profile.php?viewas=100000686899395&id=100088389657450
                    >
                      Vérifier l’inscription
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/*
 * Section des textes. Les titres sont affichés avec une option de lecture
 * complète. Cliquer sur un titre révèle ou masque le corps du texte.
 */
function TextesSimple() {
  const ref = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => setOpenIndex((curr) => (curr === idx ? null : idx));

  return (
    <section id="textes" ref={ref} className="py-16 md:py-24">
      <Container>
        <h2 className="text-3xl font-semibold text-taupe">Textes</h2>

        <div className="mt-8 space-y-4">
          {TEXTS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-xl border border-taupe/20 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header / toggle */}
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left px-5 py-4"
                  aria-expanded={isOpen}
                  aria-controls={`texte-panel-${idx}`}
                >
                  <h3 className="text-base md:text-lg font-medium text-taupe mr-3">
                    {item.title}
                  </h3>
                  <span className="text-sm text-sage underline">
                    {isOpen ? "Réduire" : "Lire la suite"}
                  </span>
                </button>

                {/* Panel */}
                {isOpen && (
                  <div id={`texte-panel-${idx}`} className="px-5 pb-5">
                    <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                      {/* body text */}
                      <div className="flex-1 max-w-[70ch] leading-relaxed text-[15.5px] tracking-[0.01em] text-neutral-800 whitespace-pre-line">
                        {item.body}
                      </div>

                      {/* image inline on the right */}
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="mt-4 md:mt-0 w-40 h-40 md:w-60 md:h-60 rounded-full object-cover shadow-md ring-2 ring-sage/20 shrink-0"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/*
 * Section des témoignages. Affiche une liste de retours clients. Chaque
 * témoignage peut être développé pour montrer l’entièreté du texte.
 */
function Temoignages() {
  const ref = useRef(null);
  useGsapReveal(ref);
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (idx) =>
    setOpenIndex((current) => (current === idx ? null : idx));
  return (
    <section
      id="temoignages"
      ref={ref}
      className="border-y border-taupe/20 bg-taupe/5 py-16 md:py-24"
    >
      <Container>
        <h2 className="text-3xl font-semibold text-taupe">Témoignages</h2>
        <p className="mt-3 text-dark">
          Merci pour votre confiance — quelques mots qui me touche
        </p>
        <div className="mt-8 space-y-4">
          {TESTIMONIALS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-taupe/20 bg-white p-5 shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <p className="font-medium text-taupe">— {item.name}</p>
                  <span className="text-sm text-sage underline">
                    {isOpen ? "Réduire" : "Lire"}
                  </span>
                </button>
                {isOpen ? (
                  <p className="mt-3 whitespace-pre-line text-dark">
                    {item.text}
                  </p>
                ) : (
                  <p className="mt-3 line-clamp-3 text-dark">{item.text}</p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/*
 * Section contact. Liste les coordonnées et quelques liens vers les réseaux
 * sociaux. Le formulaire a été retiré selon les souhaits de l’utilisateur.
 */
function Contact() {
  const ref = useRef(null);
  useGsapReveal(ref);
  return (
    <section id="contact" ref={ref} className="py-16 md:py-24">
      <Container>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-taupe">Contact</h2>
            <p className="text-dark">Terrebonne, QC</p>
            <p className="text-dark">
              <a
                href="mailto:soniatheriaultinfo@gmail.com"
                className="underline hover:text-sage"
              >
                soniatheriaultinfo@gmail.com
              </a>
            </p>
            <p className="text-dark">
              <a href="tel:14503260522" className="underline hover:text-sage">
                450‑326‑0522
              </a>
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/etrebienunpasalafois/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="rounded-full border border-taupe/40 p-2 hover:bg-sage/10"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/intervenanteenrelationdaide/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-taupe/40 p-2 hover:bg-sage/10"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@intervenantesonia?lang=fr"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="rounded-full border border-taupe/40 p-2 hover:bg-sage/10"
              >
                TikTok
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-taupe/20 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-taupe">Informations</h3>
            <ul className="mt-4 grid gap-3 text-dark">
              <li>Première rencontre: 1h30 — 135 $</li>
              <li>
                Consultations individuelles, à deux et soins énergétiques
                intuitifs
              </li>
              <li>
                Rendez‑vous sur place — J6W 2J8, 552 rue Léon-Martel Terrebonne,
                QC ou en ligne
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/*
 * Pied de page. Rappelle le copyright et propose un menu rapide.
 */
function Footer() {
  return (
    <footer className="border-t border-taupe/20 bg-white py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <img
              src="/portrait.jpg"
              alt="Logo"
              className="h-8 w-8 rounded-full object-cover ring-2 ring-sage"
            />
            <p className="text-sm text-dark">
              © {new Date().getFullYear()} Sonia Thériault — Tous droits
              réservés
            </p>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a href="#accueil" className="hover:text-sage">
              Accueil
            </a>
            <a href="#rdv" className="hover:text-sage">
              Rendez-vous
            </a>
            <a href="#textes" className="hover:text-sage">
              Textes
            </a>
            <a href="#temoignages" className="hover:text-sage">
              Témoignages
            </a>
            <a href="#contact" className="hover:text-sage">
              Contact
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

/*
 * Composant principal. Assemble toutes les sections et active le scroll fluide.
 */
export default function App() {
  useAnchorSmoothScroll();
  return (
    <div className="min-h-screen bg-white text-dark flex flex-col">
      <Header />
      <Hero />
      <Booking />
      <TextesSimple />
      <Temoignages />
      <Contact />
      <Footer />
    </div>
  );
}
