---
title: Achter de nieuwe jessekramer.nl
titleEn: Behind the new jessekramer.nl
date: 2026-07-07
category: technology
excerpt: Over het idee achter mijn nieuwe website, de technische tegenslagen en de zoektocht naar een ontwerp dat echt als van mij voelt.
excerptEn: About the idea behind my new website, the technical setbacks, and the search for a design that genuinely feels like mine.
published: true
---

Een persoonlijke website klinkt eenvoudig: wat informatie over jezelf, een paar links en een nette achtergrond. De nieuwe versie van jessekramer.nl werd uiteindelijk veel meer dan dat. Het werd een plek waar techniek, design en mijn digitale identiteit samenkomen.

De site moest niet alleen vertellen wie ik ben, maar ook laten zien hoe ik naar de digitale wereld kijk: persoonlijk, overzichtelijk en modern, zonder te voelen als een standaard portfolio of een verzameling losse sociale links.

## Een eigen plek op het internet

De afgelopen tijd ben ik mijn digitale leven steeds bewuster gaan inrichten. Minder afhankelijk van willekeurige platforms, meer controle over waar mijn gegevens, werk en identiteit samenkomen. Een eigen domein en website passen daar logisch bij.

jessekramer.nl moest daarom geen tijdelijke landingspagina worden, maar mijn vaste plek op het internet. Sociale media kunnen veranderen of verdwijnen, maar mijn eigen domein blijft van mij.

Dat idee bepaalde ook de inhoud. De homepage bestaat uit verschillende onderdelen die samen een beeld geven: waar ik mee bezig ben, mijn journal, mijn publieke rol, mijn sociale profielen en manieren om contact op te nemen. Daardoor voelt de site meer als een persoonlijk dashboard dan als een traditioneel cv.

## Van glas naar een digitale skyline

Het eerste ontwerp draaide vooral om glasachtige panelen, transparantie en een rustige kosmische achtergrond. Dat zag er verzorgd uit, maar het miste nog iets eigens. De onderdelen functioneerden, alleen voelde het geheel nog niet volledig als mijn website.

Tijdens het ontwerpen verschoof de stijl richting een paarse digitale skyline, met invloeden uit synthwave en futuristische interfaces. Niet als overdreven retrothema, maar als sfeerlaag onder de rest van de site.

Dat zorgde ook voor een uitdaging: een opvallende achtergrond kan snel concurreren met de inhoud. Daarom moesten contrast, transparantie, schaduwen en blur zorgvuldig worden afgestemd. De achtergrond bepaalt de sfeer, maar de interface moet rustig en leesbaar blijven.

Ook het logo is aangepast. Het oorspronkelijke idee moest herkenbaar blijven, maar de vormgeving moest cleaner en rustiger worden. Niet alles hoefde opnieuw bedacht te worden; soms was vereenvoudigen juist de beste verbetering.

## De techniek achter de site

De website is gebouwd met Next.js en gebruikt een file-based journal. Artikelen staan als Markdown-bestanden in de repository en worden automatisch door de site ingelezen. Daardoor heb ik geen apart CMS nodig om iets te publiceren.

De site is tweetalig opgezet. Nederlandse en Engelse teksten worden vanuit aparte vertaalbestanden geladen, terwijl journalartikelen beide talen in hetzelfde bestand kunnen bevatten. Dat houdt de structuur overzichtelijk, maar betekent ook dat wijzigingen op meerdere plekken consequent moeten worden doorgevoerd.

De interface bestaat uit losse componenten, onder andere voor de currently-status, de journalweergave, mijn gemeenteraadsprofiel en de footer. Daardoor kan ik onderdelen later aanpassen zonder de hele pagina opnieuw te bouwen.

Zelfs de soundtrack kreeg een plek. Purple Skyline kan vanuit de site worden afgespeeld en sluit aan bij de visuele sfeer. Het is een klein detail, maar juist zulke details maken de website persoonlijker.

## Tegenslagen en omwegen

Niet alles werkte meteen. Vooral de productieversie op Vercel zorgde voor problemen. Dingen die lokaal goed werkten, bleken online anders te reageren. De combinatie van routes, middleware, vertalingen en de productieomgeving leverde meerdere foutmeldingen en nieuwe deployments op.

Soms leek een probleem opgelost, om daarna op een andere plek terug te komen. De oplossing zat niet in één grote ingreep, maar in het stap voor stap eenvoudiger maken van de structuur. Middleware werd aangepast, locale-routes werden explicieter gemaakt en onderdelen die in productie onnodig ingewikkeld waren, zijn vereenvoudigd.

Ook het ontwerp veranderde meerdere keren. Achtergronden, panelen, afstanden, het logo en de indeling zijn steeds opnieuw bekeken. Dat voelde soms alsof het project achteruitging, maar juist die aanpassingen brachten de site dichter bij wat ik voor ogen had.

## Geen eindpunt

De zwaarste bouwfase is nu voorbij, maar de website is niet af. Dat hoeft ook niet. Een persoonlijke website mag meegroeien met de persoon erachter.

Er zijn nog teksten die beter kunnen, details die aangepast moeten worden en nieuwe ideeën die later een plek krijgen. Het verschil is dat de basis nu goed voelt. De site is niet alleen technisch online, maar voelt ook echt als mijn eigen plek.

Voorlopig ben ik daarom vooral aan het genieten van mijn nieuwe website.

---en---

A personal website sounds simple: some information about yourself, a few links, and a clean background. The new version of jessekramer.nl became much more than that. It became a place where technology, design, and my digital identity come together.

The website had to do more than explain who I am. It also had to reflect how I see the digital world: personal, structured, and modern, without feeling like a standard portfolio or a collection of social links.

## A place of my own online

Recently, I have been organising my digital life more consciously. I want to depend less on random platforms and have more control over where my data, work, and identity come together. Owning a domain and website fits naturally into that idea.

jessekramer.nl was never meant to be a temporary landing page. It had to become my permanent place on the internet. Social platforms can change or disappear, but my own domain remains mine.

The homepage therefore works more like a personal dashboard than a traditional résumé. It brings together what I am currently doing, my journal, my public role, social profiles, and contact options.

## From glass to a digital skyline

The first design focused on glass-like panels, transparency, and a calm cosmic background. It looked polished, but it still lacked something personal.

Over time, the visual direction shifted towards a purple digital skyline, influenced by synthwave and futuristic interfaces. The goal was not to create an exaggerated retro theme, but to use that atmosphere as a layer beneath the content.

That also created a design challenge. A strong background can easily compete with the interface, so contrast, transparency, shadows, and blur had to be carefully balanced. The background should define the mood, while the content remains calm and readable.

The logo changed as well. The original idea had to remain recognisable, but the result needed to be cleaner and more restrained. Sometimes the best redesign is not a completely new idea, but a simpler version of the existing one.

## The technology behind it

The website is built with Next.js and uses a file-based journal. Articles are stored as Markdown files in the repository and are automatically loaded by the site. This means I do not need a separate CMS to publish something new.

The website is bilingual. Dutch and English interface text is stored in translation files, while journal articles can contain both languages in a single file. The structure is simple, although changes often need to be applied consistently in several places.

The interface is divided into reusable components for elements such as the currently status, journal, municipal council profile, and footer. This makes future changes easier without rebuilding the whole page.

Even the soundtrack became part of the experience. Purple Skyline can be played directly from the website and reinforces the visual atmosphere. It is a small detail, but details like that make the site feel personal.

## Setbacks and detours

Not everything worked immediately. The production version on Vercel caused the biggest technical issues. Features that worked locally behaved differently online. Routing, middleware, translations, and the production environment led to several errors and repeated deployments.

The solution was not one large fix, but gradually simplifying the structure. Middleware was adjusted, locale routes became more explicit, and parts that were unnecessarily complex in production were simplified.

The design also changed several times. Backgrounds, panels, spacing, the logo, and the layout were repeatedly reconsidered. At times that felt like moving backwards, but every revision brought the site closer to the result I had imagined.

## Not a finished product

The most intensive building phase is over, but the website is not finished. It does not need to be. A personal website should be able to grow together with the person behind it.

There are still texts to improve, details to adjust, and new ideas to add later. The important part is that the foundation now feels right. The site is not only technically online; it genuinely feels like my own place.

For now, I am simply enjoying my new website.
