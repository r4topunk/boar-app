## C01

**Q:** AC versus DC electricity: how do they differ, and why do power grids mostly use AC?

**Notes:** Direction reversal; transformers make voltage conversion easy for long-distance transmission; HVDC exists for some links.

### A

AC (alternating current) and DC (direct current) differ in that AC periodically reverses direction, while DC flows in one direction consistently. AC is used in power grids because it can be easily transmitted over long distances without significant energy loss. This makes it more practical for large-scale power transmission, ensuring stable and consistent power delivery to consumers.

### B

The short answer: DC flows steadily in one direction. AC keeps reversing direction, 50 or 60 times a second depending on the country. Grids mostly use AC because a simple, cheap transformer can raise or lower AC voltage, and high voltage is what lets power travel long distances without wasting much of it.

How they differ
- DC: voltage and current stay constant. Batteries, solar panels, and electronics like phones and laptops all run on DC.
- AC: voltage swings back and forth in a smooth wave. Wall outlets supply AC because rotating generators naturally produce it.

Why grids chose AC
1. Transformers only work with AC. A transformer relies on a changing magnetic field, and only alternating current creates one. Steady DC can't drive a passive transformer.
2. High voltage cuts losses. For the same amount of power, higher voltage means less current. Less current means less energy lost as heat in the wires. So power plants step voltage up to hundreds of kilovolts for transmission, and transformers near homes step it back down to safe levels.
3. History. In the "War of the Currents" of the 1880s and 1890s, Westinghouse and Tesla's AC system beat Edison's DC. At the time, DC voltage couldn't be changed efficiently, so DC power couldn't be sent far.

Where DC is coming back
Modern power electronics now make high-voltage DC (HVDC) practical in some cases:
- Very long overhead lines, where it becomes cheaper and more efficient than AC
- Undersea cables
- Linking grids that aren't synchronized with each other

The downside is that HVDC needs expensive converter stations at each end. So AC still handles most transmission and all local distribution.

---

## C02

**Q:** TCP versus UDP: what's the difference and when would you choose each?

**Notes:** TCP connection-oriented, reliable, ordered; UDP connectionless, low overhead. Web/email vs streaming/games/DNS.

### A

TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are both protocols used for transmitting data over a network, but they differ in how they handle data transmission.

TCP is a connection-oriented protocol, which means it establishes a connection between the sender and receiver before data is sent. This connection allows for reliable data delivery, error detection, and flow control. TCP is commonly used for transferring large amounts of data, such as web pages, files, or multimedia content, because it ensures that data is sent accurately and efficiently.

UDP, on the other hand, is a connectionless protocol, meaning it does not establish a connection before sending data. This makes it faster and more efficient for real-time applications, such as streaming videos or multiplayer games, where quick delivery of data is crucial. UDP does not provide data reliability or error detection, which makes it less suitable for applications that require high accuracy in data transmission.

When to choose TCP: Use TCP if you need guaranteed delivery of data with minimal errors. TCP is the protocol of choice for file transfers, web browsing, and other applications that require reliable data transmission.

When to choose UDP: Use UDP if you need fast data delivery, especially in real-time applications. UDP is used for applications that prioritize speed over data reliability, such as VoIP (Voice over Internet Protocol) and video streaming.

### B

Short answer: TCP gives you a reliable, ordered connection but costs extra time and overhead. UDP just sends individual packets fast, with no guarantees. Use TCP when every byte has to arrive correctly. Use UDP when speed and low delay matter more than getting every packet.

TCP (Transmission Control Protocol, RFC 9293)
- Connection first: Before any data moves, the two sides do a three-way handshake, which takes one round trip.
- Reliable and in order: The receiver confirms what it got, lost pieces are sent again, and data is put back in the right order.
- Flow and congestion control: TCP slows down so it doesn't overwhelm the receiver or the network.
- Continuous stream: Data arrives as one flowing stream of bytes. The app's original message boundaries aren't kept.
- Choose it for: web pages (HTTP/1.1 and HTTP/2), email, file transfers, SSH, database connections. Anywhere missing or scrambled data would break things.

UDP (User Datagram Protocol, RFC 768)
- No connection: It sends right away, with no handshake, no receipts and no resending.
- No guarantees: Packets can be lost, duplicated or arrive out of order.
- Separate messages: Each packet (a "datagram") arrives as one complete message, and the headers are small.
- Choose it for: live voice and video calls, online games, live streaming, DNS lookups, and one-to-many sending (broadcast or multicast). In these cases a late packet is useless, so resending it is pointless.

The rule of thumb: If late data is worse than missing data, use UDP. If you need correct, complete data, use TCP.

One nuance: Apps can add their own reliability on top of UDP. QUIC, which HTTP/3 runs on, does this. It gets TCP-like guarantees with a faster setup and avoids a problem where one lost packet holds up everything behind it.

---

## C03

**Q:** What were the main causes and consequences of the Great Famine in Ireland?

**Notes:** Potato blight, dependence on potato, land system/British policy; ~1M deaths, ~1M+ emigrated, lasting population decline.

### A

Ireland's Great Famine (1845–1852) started with a crop disease, potato blight. It became a national catastrophe because millions of poor people depended almost entirely on the potato and because the government's response was weak. About 1 million people died, and 1–2 million more emigrated.

Causes
- Potato blight: A mould called *Phytophthora infestans* reached Ireland around 1844. It destroyed about one-third of the 1845 crop and about three-quarters of the 1846 crop. The main variety grown, the "Lumper," had little genetic diversity, which made it more vulnerable.
- Dependence on one crop: The rural poor lived almost only on potatoes.
- The land system: Many tenants farmed tiny plots, often under 5 acres, with no secure right to stay. Many landlords lived elsewhere, and middlemen took their share. This left families with nothing to fall back on.
- Government policy: The Whig government in London believed in keeping out of the market. It limited relief, and Treasury official Charles Trevelyan resisted doing more. It did not ban food exports, so grain kept leaving Ireland while people starved. The "Gregory clause" refused relief to anyone holding more than a quarter-acre, which pushed people to give up their land.

Consequences
- Deaths and emigration: Ireland's population fell from about 8.4 million in 1844 to 6.6 million in 1851, and it kept falling for decades. Irish communities grew large in the US, Britain, Canada and Australia.
- Evictions and land changes: Landlords evicted hundreds of thousands of tenants. Land ended up in fewer hands and was used more for cattle and sheep sold to Britain.
- Decline of the Irish language: The famine hit the Irish-speaking west and south hardest.
- Politics: It deepened resentment of British rule and fed Irish nationalism. Later land reforms gave tenants more protection.

### B

The Great Famine in Ireland was primarily caused by a combination of factors. The main causes included the failure of potato crops due to a disease known as blight, a severe shortage of food, and economic instability. The consequences were devastating, leading to a mass exodus of people from Ireland as they fled the famine conditions, resulting in significant population decline and economic hardship.

---

## C04

**Q:** How did government in the Roman Republic differ from the Roman Empire?

**Notes:** Elected consuls/Senate/assemblies vs emperor with concentrated power; transition under Augustus 27 BC.

### A

In the Roman Republic, the government was led by a senate composed of patrician families, and the consuls were elected officials who oversaw the government. The consuls were responsible for military affairs and civil administration. The Senate had the power to veto legislation and appointed officials. The Roman Republic also had a bicameral legislature consisting of the Senate and the Assembly of the Centuriate.

In the Roman Empire, the government was led by an emperor who was appointed by the Senate and had the authority to make laws and declare war. The Senate's influence diminished, and the emperor had more power over the legislative and executive branches. The Roman Empire also had a bureaucracy that oversaw the administration of the empire and a complex legal code.

### B

The main difference is where power sat. In the Republic (509–27 BCE), power was split among elected officials who served for a limited time. In the Empire (from 27 BCE), one man, the emperor, held the real power, even though most of the republican institutions still existed.

Roman Republic
- Consuls: Voters elected two consuls each year. They commanded the army and ran the Senate, and each could veto the other. The one-year terms and the veto were meant to stop any one person from taking over.
- Senate: Its members were mostly former magistrates, usually from elite families. It advised the magistrates and had strong control over foreign policy and public money.
- Assemblies: Citizen assemblies elected the magistrates and passed laws. Tribunes protected ordinary citizens (plebeians).

Roman Empire
- Emperor: Augustus set up the "Principate" and called himself *princeps*, meaning "first citizen," instead of king. In practice, he and later emperors held military command (*imperium*) with no co-ruler and no end date. They controlled the legions, appointed provincial governors, issued edicts that counted as law, and controlled the treasury.
- Consuls: Rome kept electing them, but the emperor effectively chose who got the job, so the office became mostly an honor.
- Senate and assemblies: The Senate kept meeting, but it became more and more ceremonial. The popular assemblies faded away.
- Emperor's household: Real decisions moved to the emperor and the people around him.

The Empire kept the outward form of the Republic, but control belonged to one ruler. The shift followed a century of civil wars that the republican system couldn't handle.

---

## C05

**Q:** Which chemical element has an atomic number equal to the number of US states?

**Notes:** 50 states: tin (Sn).

### A

The answer is tin (Sn), atomic number 50. The United States has 50 states, and Hawaii became the 50th in 1959.

A few facts about tin:
- It's a soft, silvery-white metal in group 14 of the periodic table.
- If you bend a bar of tin, it makes a crackling sound called the "tin cry." The sound comes from its crystal structure breaking.
- Tin has 10 stable isotopes, more than any other element. That's linked to 50 being a "magic number" in nuclear physics, which makes nuclei with 50 protons especially stable.
- It has been used since the Bronze Age, when people mixed it with copper to make bronze. Today it's used in solder, in bearing metals and as a coating on steel food cans.
- Most tin comes from an ore called cassiterite.

The number of states isn't fixed. If a 51st state were ever admitted, for example Puerto Rico or D.C., the answer would change to antimony (Sb, atomic number 51).

### B

Hydrogen has an atomic number equal to the number of US states.

---

## C06

**Q:** Is it true that lightning never strikes the same place twice?

**Notes:** False; tall structures are struck repeatedly (Empire State Building ~20-25 times/year).

### A

It is true that lightning never strikes the same place twice. [n]

### B

No, it's a myth. Lightning often hits the same place more than once. Tall, pointed, isolated objects get struck again and again. The U.S. National Weather Service and NOAA both list the saying as a myth.

Evidence:
- The Empire State Building is hit about 20–25 times a year, according to the National Weather Service. In one storm it was struck eight times in 24 minutes.
- Other tall structures such as radio and TV towers, wind turbines, lighthouses and mountaintop peaks also get hit over and over.

Why it happens:
Lightning doesn't "remember" where it struck before. Each strike takes the easiest path between the cloud and the ground, and tall, exposed, conductive objects keep offering that path. So a spot that was a good target once is likely to be one again, even in the same storm. A single lightning flash can also include several strokes along the same channel, so one spot can be hit several times within a second.

Safety point:
The myth can be dangerous if it makes someone feel safe after a strike nearby. The official advice is "When thunder roars, go indoors." Shelter in a solid building or a hard-topped car, and wait 30 minutes after the last thunder before going back outside. If someone is struck, call emergency services right away. It's safe to touch them because they don't hold an electrical charge. Start CPR if they aren't breathing.

The saying still works as a figure of speech meaning "unlikely events don't repeat," but as a statement about real lightning it's false.

---

## C07

**Q:** If it is 3 PM in Tokyo, what time is it in São Paulo?

**Notes:** UTC+9 vs UTC-3 (Brazil has no DST since 2019): 12 hours behind, 3 AM the same day.

### A

When it's 3:00 PM in Tokyo, it's 3:00 AM the same day in São Paulo.

Why:
- Tokyo uses Japan Standard Time (UTC+9) and doesn't have daylight saving time.
- São Paulo uses Brasília Time (BRT, UTC−3). Brazil ended daylight saving time in 2019 through Presidential Decree No. 9,772, and the last clock change was in February 2019.
- That makes São Paulo 12 hours behind Tokyo all year. You subtract 12 hours: 15:00 in Tokyo is 03:00 in São Paulo.

Tips for travelers:
- The two cities are exactly half a day apart, so the clock time is the same number with AM and PM swapped. 3 PM becomes 3 AM, and 9 AM becomes 9 PM.
- Because São Paulo is behind, it's often the previous day there. For example, 10 AM Monday in Tokyo is 10 PM Sunday in São Paulo.
- Neither city changes its clocks now, so the 12-hour gap doesn't change with the seasons. That's different from converting times with the US or Europe.

### B

3 PM in Tokyo is 10 AM in São Paulo.

---

## C08

**Q:** Como funciona o sistema de freios ABS de um carro?

**Notes:** Sensores de velocidade das rodas; modulação da pressão para evitar travamento; mantém dirigibilidade.

### A

O sistema de freios ABS (Adaptive Brake System) utiliza sensores de rotação e velocidade para determinar a correta distribuição de freio em um carro. Quando o sistema detecta um acidente ou uma situação de alta velocidade, ele automaticamente pressiona o freio em determinados pontos do veículo para garantir que todos os pneus fiquem presos na rotação, evitando um deslizamento.

### B

Resumo: o ABS (sistema de freios antitravamento) impede que as rodas travem numa frenagem forte. Ele alivia e reaplica a pressão do freio em cada roda muitas vezes por segundo. Assim os pneus continuam girando e aderindo ao piso, e o motorista consegue continuar esterçando enquanto freia.

Componentes principais:
1. Sensores de velocidade, um em cada roda. Geralmente são um anel dentado que gira perto de um sensor magnético. A frequência do sinal gerado indica a rotação da roda.
2. Unidade de controle eletrônico (ECU): compara as rodas entre si e calcula a desaceleração de cada uma. Uma roda que desacelera rápido demais está prestes a travar.
3. Unidade hidráulica (modulador): tem válvulas solenoides e uma bomba que controlam a pressão do fluido em cada freio.

Como funciona:
- Freando normalmente, o ABS não interfere.
- Se uma roda começa a travar, a ECU manda as válvulas agirem em três etapas: segurar a pressão, aliviar (a bomba devolve o fluido) e reaplicar quando a roda volta a girar.
- Esse ciclo se repete muitas vezes por segundo (em geral, na faixa de 5 a 10 Hz). É isso que causa a vibração no pedal e o ruído que o motorista sente.

Dicas práticas:
- Numa emergência, pise firme e mantenha o pedal pressionado. Não bombeie o freio, porque o sistema já faz isso sozinho.
- O ABS nem sempre encurta a distância de frenagem, especialmente em cascalho ou neve fofa. O principal ganho é manter a estabilidade e a dirigibilidade.
- Se a luz "ABS" ficar acesa no painel, os freios comuns continuam funcionando, mas sem o antitravamento. Leve o carro a uma oficina.

---

## C09

**Q:** What does 'obrigado' mean in Portuguese, and why do some people say 'obrigada' instead?

**Notes:** 'Thank you'; agrees with speaker's gender: men say obrigado, women obrigada.

### A

"Obrigado" means "thank you." Literally it means "obliged." When you say it, you're saying something like "I am obliged (to you)." People say "obrigada" instead because the word agrees with the gender of the person speaking, not the person being thanked.

Where it comes from: The word comes from the Latin *obligātus*, "obliged" or "bound by an obligation." It's the past participle of the verb *obrigar*, "to oblige." Because it works like an adjective describing the speaker ("I am obliged"), it follows the normal Portuguese rule that adjectives change to match gender:
- A man says obrigado (the -o ending is masculine).
- A woman says obrigada (the -a ending is feminine).

So a woman thanking a man still says "obrigada," and a man thanking a woman still says "obrigado." Learners often get this backwards.

Other details:
- Plurals: Traditional grammar says "obrigados" when a group of men or a mixed group gives thanks, and "obrigadas" for a group of women. In everyday speech these forms are rare.
- In practice: Some women say "obrigado," especially in casual speech, though language authorities often discourage this.
- Informal versions: "Brigado/brigada" in speech, and "obg" in text messages.
- Replies: Common answers are "de nada" ("it's nothing") or, in Brazil, "por nada."

### B

'Obrigado' means 'thank you' in Portuguese, and people say 'obrigada' instead when the speaker is female because it's a more formal and respectful way to express gratitude.

---

## C10

**Q:** An adult is choking and can't speak or cough. What are the steps?

**Notes:** Call emergency; back blows and abdominal thrusts (Heimlich) alternating per guideline; if unconscious start CPR.

### A

This is a severe airway blockage. Act right away: alternate 5 back blows and 5 abdominal thrusts, and get someone to call emergency services.

Steps (2025 American Heart Association guidelines):

1. Confirm it's choking. Ask "Are you choking?" If they can't speak, cough or breathe, act now. If they *can* cough forcefully, let them keep coughing and stay with them.
2. Call for help. Have someone call 911 or your local emergency number. If you're alone, start helping first and call as soon as you can.
3. Give 5 back blows. Stand beside and slightly behind them and lean them forward. Hit firmly between the shoulder blades with the heel of your hand.
4. Give 5 abdominal thrusts (Heimlich). Stand behind them and wrap your arms around their waist. Put a fist just above the belly button, grab it with your other hand, and pull sharply inward and upward.
 - If the person is pregnant or too large to reach around, give chest thrusts on the center of the breastbone instead.
5. Repeat 5 and 5 until the object comes out or the person becomes unresponsive.
6. If they become unresponsive, lower them to the ground, make sure emergency services are on the way, and start CPR with chest compressions. Each time you open the airway, look in the mouth and remove any object you can see. Don't do blind finger sweeps.

Get medical care afterward, even if the object came out. Abdominal thrusts can cause internal injuries, and pieces of the object may still be in the airway.

This order is new. Older US guidance started with abdominal thrusts, but in 2025 the AHA put back blows first because studies linked them to better clearance and fewer injuries.

### B

The steps to help an adult who is choking and can't speak or cough are:

1. Ensure Safety: First, ensure the scene is safe. Remove any nearby hazards.

2. Chest Compression: Place the person on their back on a firm surface.

3. Call 911 or seek medical help: If the person is conscious, ask them to call emergency services. If they are unconscious, perform the Heimlich maneuver.

4. Heimlich Maneuver: If the person is conscious, give five back blows and four abdominal thrusts. For an unconscious person, perform the Heimlich maneuver.

5. Repeat if Necessary: If the person is still not breathing and is still choking, repeat the steps until the person can breathe or is saved by professionals.

Remember, if you are alone, you can only perform the first two steps yourself. For more severe choking, seek professional help immediately. [n]

---

## C11

**Q:** In what year did the author of One Hundred Years of Solitude win the Nobel Prize, and who was the previous Latin American winner of the literature prize?

**Notes:** García Márquez 1982; previous Latin American laureate Pablo Neruda (1971).

### A

Gabriel García Márquez, the author of *One Hundred Years of Solitude*, won the Nobel Prize in Literature in 1982. The Latin American winner right before him was the Chilean poet Pablo Neruda, in 1971.

- García Márquez (Colombia), 1982: The Swedish Academy honored him "for his novels and short stories, in which the fantastic and the realistic are combined in a richly composed world of imagination, reflecting a continent's life and conflicts." He was the first Colombian to win it and the fourth Latin American writer. *One Hundred Years of Solitude* (1967) was the main work behind the award.
- Pablo Neruda (Chile), 1971: He won "for a poetry that with the action of an elemental force brings alive a continent's destiny and dreams." He was Chile's second literature laureate.
- Earlier Latin American winners: Gabriela Mistral of Chile in 1945 was the first, and Miguel Ángel Asturias of Guatemala followed in 1967. After García Márquez, Mario Vargas Llosa of Peru became the fifth in 2010.

### B

Eduardo Barrios won the National Prize for Literature in 1946. The previous Latin American winner of the Nobel Prize for Literature was Julio Cortázar.

---

## C12

**Q:** How did the Black Death change Europe's economy and society?

**Notes:** 30-60% died; labor shortage raised wages, weakened serfdom, persecution of Jews, religious upheaval.

### A

The Black Death, a pandemic that ravaged Europe from 1347 to 1351, had profound and far-reaching effects on the economy and society of medieval Europe. The epidemic killed approximately 75% of Europe's population, leading to widespread social upheaval, labor shortages, and economic instability. The labor shortage resulted in increased wages and higher profits for merchants, who had more capital to invest in trade and industry. This stimulated economic growth and the development of new industries. However, the population decline also led to demographic imbalances and changes in social structures, including an increase in the number of widows and orphans, which had long-term effects on the labor market and social norms. The mortality rate for the plague was higher among the elderly, so the death of this demographic class contributed to a demographic shift, leading to a younger population and potentially affecting the workforce.

### B

The Black Death (1347–1351) killed roughly a third to half of Europe's people. With so many dead, workers became scarce and land became plentiful, and that shift in the balance of power changed the medieval economy and social order for good.

Economic changes
- Higher wages: Workers could bargain because employers were short of hands. Real wages rose for about a century, and many historians describe the 15th century as a "golden age" for laborers.
- Cheaper land and rents: There was far more land than people to farm it, so rents and land values fell. Some farmers moved from growing grain to raising livestock, which needs fewer workers.
- Rising prices: Skilled craftsmen were scarce, so goods and services cost more.
- Laws to hold wages down: England's Ordinance of Laborers (1349) and Statute of Laborers (1351) tried to freeze wages at pre-plague levels. They slowed wage rises only for a while, mainly in England.

Social changes
- Serfdom weakened in Western Europe: Peasants could move away or demand freedom and better terms. In Eastern Europe the opposite happened, as lords tightened serfdom.
- Revolts: Resentment of wage caps and taxes helped spark uprisings such as the Jacquerie in France (1358) and the English Peasants' Revolt (1381).
- Scapegoating: Jews were falsely blamed for the plague, and many Jewish communities were massacred, for example in Strasbourg in 1349.
- Religion and culture: The Church lost some prestige because it couldn't stop the disease, and many experienced clergy died. Flagellant movements, in which penitents whipped themselves in public, appeared, and art became preoccupied with death (the *danse macabre*).

Historians still debate how much each change came from the plague itself and how much from trends already underway.

---

## C13

**Q:** Which countries does the Danube flow through?

**Notes:** Germany, Austria, Slovakia, Hungary, Croatia, Serbia, Romania, Bulgaria, Moldova, Ukraine (10 countries); ends in Black Sea.

### A

The Danube flows through or along the borders of 10 countries, more than any other river in the world. From source to mouth they are:

1. Germany: it starts in the Black Forest.
2. Austria
3. Slovakia
4. Hungary
5. Croatia
6. Serbia
7. Romania
8. Bulgaria
9. Moldova
10. Ukraine: it reaches the Black Sea through a delta shared by Romania and Ukraine.

Useful details:
- It's about 2,850 km (1,770 miles) long, second in Europe only to the Volga.
- In several places the river forms a border instead of running through a country. These include Slovakia–Hungary, Croatia–Serbia, Serbia–Romania (at the Iron Gates gorge), Romania–Bulgaria, and Romania–Ukraine.
- Moldova's part is tiny, only a few hundred metres of riverbank near Giurgiulești. Still, it gives the country its only access to the Black Sea.
- The Danube runs through four capital cities, more than any other river: Vienna, Bratislava, Budapest and Belgrade.
- Its drainage basin is even bigger than the list above. Its tributaries also drain parts of Switzerland, Italy, Poland, Czechia, Slovenia, Bosnia and Herzegovina, Montenegro, Albania and North Macedonia, which makes 19 countries in total.

### B

The Danube River flows through 10 countries: Germany, Austria, Slovakia, Hungary, Croatia, Serbia, Bulgaria, Romania, Moldova, and Ukraine. [n]

---

## C14

**Q:** What is the smallest country in South America by area?

**Notes:** Suriname (~164,000 km²) is the smallest sovereign state; French Guiana is smaller but is a French region, not a country.

### A

Suriname is the smallest independent country in South America by area. It covers about 163,820 km² (roughly 63,250 sq mi). Some sources, including Wikipedia, give a slightly larger figure of about 165,940 km².

- Where it is: Suriname sits on the northeast coast. Guyana is to the west, French Guiana to the east and Brazil to the south.
- Size for comparison: It's a little smaller than the U.S. state of Georgia, or about the size of Tunisia.
- A common point of confusion: French Guiana (about 83,500 km²) is smaller. But it's an overseas region of France, not a sovereign country, so it usually isn't counted. The Falkland Islands, a British Overseas Territory, are even smaller for the same reason.
- Also the least populated: Suriname also has the fewest people of any South American country, about 600,000, most of them near the capital, Paramaribo. Around 90% of the country is tropical rainforest.
- Other facts: Dutch is the official language, making it the only Dutch-speaking country in the Americas. It became independent from the Netherlands in 1975.

So if a quiz asks for the smallest *country*, the answer is Suriname. If it asks about all territories, French Guiana is smaller.

### B

The smallest country in South America by area is Suriname. It covers approximately 163,800 square kilometers [n]. Note: While Suriname is the smallest in South America, it is not the smallest country in the world by area.

---

## C15

**Q:** What is known about the causes of colony collapse disorder in honey bees?

**Notes:** Multiple factors: Varroa mites and viruses, neonicotinoid pesticides, poor nutrition, stress from migratory beekeeping; no single cause.

### A

The context provided does not contain information about colony collapse disorder in honey bees. Therefore, no specific causes can be derived from the given sources. [n]

### B

No single cause of colony collapse disorder (CCD) has ever been found. Researchers agree it most likely comes from several stresses acting together.

What CCD is: Beekeepers first reported it widely in the winter of 2006–07, when some lost 30–90% of their hives. In a collapsed hive, most of the worker bees are suddenly gone and few dead bees are found nearby. The queen, the brood and plenty of honey and pollen are left behind.

Main suspected causes (USDA and EPA):
- Varroa mites. These invasive parasites weaken bees and spread viruses.
- Pathogens. Israeli acute paralysis virus and the gut parasite *Nosema* are the main ones named.
- Pesticides. Bees are exposed through sprays on crops and through chemicals beekeepers use in hives to control mites. Some pesticides harm bees at doses too low to kill them outright.
- Poor nutrition. Habitat loss and large single-crop farms leave bees without enough varied food.
- Management stress. Hives are trucked long distances to pollinate crops.
- Combined effects. Several of these stresses together may weaken bees' immune systems, so colonies can fail even when no one factor would have killed them.

Current status: USDA calls CCD "an incomplete puzzle." Reported CCD cases have fallen sharply. In 2008 about 60% of winter losses were blamed on CCD. By 2013 it was about 31%, and early reports for the 2014–15 winter listed none. Beekeepers still lose many colonies, though, often from mites, disease and poor food supply rather than classic CCD. So bee health is still a concern even though the dramatic "disappearing bees" pattern is now rare.

---

## C16

**Q:** Why is the Great Wall of China visible from the Moon with the naked eye?

**Notes:** False premise: it is not visible from the Moon, and hardly from low Earth orbit with the naked eye. Must correct the premise.

### A

The Great Wall of China is not visible from the Moon with the naked eye. This is a common misconception. The wall is too narrow, too faint against the lunar background, and too far away—approximately 384,400 kilometers from Earth—to be seen without powerful telescopes. Even under ideal conditions, the wall's width and contrast do not make it visible from lunar orbit. [n]

### B

The question starts from a myth. You can't see the Great Wall of China from the Moon with the naked eye, and no astronaut who went there has said they could.

Why it can't be seen
- The Moon is about 384,000 km away. From there, Earth looks like a small disc of white clouds, blue ocean and patches of yellow and green. Apollo 12's Alan Bean said "No man-made object is visible at this scale."
- The wall is thousands of kilometres long but mostly only a few metres wide, and its stone and earth are about the same colour as the land around it. Seeing it from the Moon has been compared to spotting a single hair from about 3 km away.
- Neil Armstrong said many times that it is "definitely not visible from the Moon." Jim Lovell called the claim "absurd," and Jim Irwin said it was "out of the question."

Even from low orbit it's very hard to see
From the International Space Station, about 400 km up, the wall is extremely hard to make out without a camera or zoom lens. China's first astronaut, Yang Liwei, said in 2003 that he couldn't see it. Cities, highways and airports are much easier to spot, especially city lights at night.

Where the myth came from
It's older than spaceflight. In 1754 the English antiquarian William Stukeley wrote that the wall "may be discerned at the Moon." Nobody could check the claim for more than 200 years, so it spread through books and trivia collections. It's still repeated today, even though astronauts have disproved it.

---

## C17

**Q:** What are the symptoms of altitude sickness, and how can I prevent it when trekking?

**Notes:** Headache, nausea, fatigue, insomnia; gradual ascent (~300-500 m/day sleeping altitude above 3,000 m), hydration, acetazolamide; descend if severe (HAPE/HACE).

### A

The context provided does not include information on altitude sickness or prevention. For reliable details on symptoms (such as headache, nausea, dizziness) and prevention (like acclimatization, hydration, and medication), consult medical or outdoor safety resources [n].

### B

Altitude sickness usually begins with a headache 2–12 hours after you reach a high altitude, generally above about 2,500 m (8,200 ft). The best way to prevent it is to climb slowly and give your body time to adjust.

Symptoms
- Mild form (acute mountain sickness, or AMS): A headache plus at least one of these: loss of appetite, nausea or vomiting, dizziness, fatigue. It often gets better within 1–3 days if you rest and don't go any higher.
- Brain swelling (HACE), an emergency: confusion, strange behavior, stumbling or poor coordination, extreme drowsiness.
- Fluid in the lungs (HAPE), an emergency: getting out of breath much faster than normal when active, then being breathless even at rest. You may also have chest congestion, a cough, or pink or bloody spit.

Prevention while trekking
- Go up slowly. If you can, spend 2–3 nights at about 2,500–2,750 m before going higher. Don't go straight from low ground to sleeping above 2,750 m in one day.
- Above 3,000 m, raise the height where you sleep by no more than 500 m per day. Add a rest day for every extra 1,000 m you gain.
- "Climb high, sleep low": day hikes to higher points are fine if you come back down to sleep.
- Never go higher to sleep while you have symptoms, even mild ones.
- Take it easy for the first 48 hours: no alcohol and only light exercise.
- Medicine: Acetazolamide, taken from the day before you start climbing, can help prevent it. It needs a prescription, so ask a doctor or travel clinic.

When to get help
Stop going up if you have symptoms. If they get worse, or you notice confusion, clumsiness, or breathlessness at rest, go down right away, even if it's only 300–1,000 m. Get medical care urgently and use oxygen if it's available.

---

## C18

**Q:** Como fazer RCP (reanimação cardiopulmonar) em um adulto?

**Notes:** Verificar resposta, chamar ajuda/DEA; compressões no centro do peito, 100-120/min, 5-6 cm de profundidade; 30:2 se treinado ou só compressões.

### A

Resumo: se o adulto não responde e não respira normalmente (ou só "puxa o ar" com dificuldade), ligue para a emergência. No Brasil, o número é 192 (SAMU). Em seguida, comece na hora as compressões fortes e rápidas no centro do peito, na frequência de 100 a 120 por minuto, e use um desfibrilador (DEA) assim que houver um disponível.

Passo a passo (leigo):
1. Segurança: veja se o local é seguro para você e para a vítima.
2. Avalie: toque nos ombros e chame a pessoa em voz alta. Observe o peito por até 10 segundos para ver se ela respira.
3. Peça ajuda: ligue 192 e use o viva-voz. Peça que alguém procure um DEA.
4. Posição: deite a pessoa de costas sobre uma superfície firme. Coloque as mãos, uma sobre a outra, na metade inferior do esterno (centro do peito), com os braços esticados e os ombros bem em cima das mãos.
5. Comprima: afunde o peito 5 a 6 cm, 100 a 120 vezes por minuto (no ritmo de "Stayin' Alive"). Deixe o tórax voltar totalmente entre uma compressão e outra e interrompa o mínimo possível.
6. Respirações: se você for treinado, faça 30 compressões e depois 2 ventilações (incline a cabeça para trás, levante o queixo, tampe o nariz e sopre por cerca de 1 segundo até o peito subir). Se não for treinado ou não quiser fazer as ventilações, faça apenas compressões contínuas.
7. DEA: ligue o aparelho e siga as instruções de voz. Volte às compressões logo depois do choque.
8. Troque de socorrista a cada 2 minutos ou antes, se estiver cansado.
9. Continue até a pessoa voltar a respirar normalmente, a equipe de resgate assumir ou você não conseguir mais.

Este é um guia geral. Um curso prático de Suporte Básico de Vida (SBV/BLS), da Cruz Vermelha ou de centros credenciados pela AHA, faz grande diferença na hora real.

### B

Para fazer RCP em um adulto:
1. Coloque o paciente de costas em um plano sólido, com o tronco bem alinhado.
2. Coloque as mãos no centro do peito, sobre o esterno, com as mãos sobrepostas e as pontas das mãos na parte inferior do esterno.
3. Com força, pressione o peito profundamente a cerca de 5–6 cm, a uma taxa de 100–120 compressões por minuto.
4. Após cada 30 compressões, dê 2 respirações com boca a boca (se você estiver treinado).
5. Continue o ciclo de compressões e respirações até que o paciente comece a respirar normalmente ou até que ajuda médica chegue [n].

*Nota: Este conteúdo não está no contexto fornecido, mas é conhecido por meio de boas práticas de primeiros socorros.*

---

## C19

**Q:** Which direction is Arabic written in, and how do you say hello in Arabic?

**Notes:** Right to left; as-salamu alaykum (reply wa alaykum as-salam), marhaba.

### A

Arabic is written from right to left. The most common ways to say hello are مرحبا (marhaban), a general "hello," and السلام عليكم (as-salāmu ʿalaykum), which means "peace be upon you."

Writing direction
- Letters and words run right to left, and books open from what English readers would call the back.
- Letters in a word usually join together in a cursive style.
- One exception: numbers are read left to right, even inside Arabic text.

Saying hello
- مرحبا – marhaban ("MAR-ha-ban"): a casual, polite "hello" or "welcome." It's understood across the Arab world.
- السلام عليكم – as-salāmu ʿalaykum: the traditional greeting. It's used most by Muslims, but it's older than Islam and many Arabic speakers who aren't Muslim use it too. It's a safe, respectful choice almost anywhere.
 - The reply is وعليكم السلام – wa ʿalaykumu s-salām ("and upon you be peace").
 - A longer, more formal version is *as-salāmu ʿalaykum wa raḥmatullāhi wa barakātuh* ("…and the mercy of God and His blessings").

Travel tip: Spoken Arabic varies by region, so you'll also hear local greetings like *ahlan* ("hi") or *ahlan wa sahlan* ("welcome"). Marhaban and as-salāmu ʿalaykum will be understood everywhere.

### B

Arabic is written from right to left.
Hello in Arabic is "مرحبا" (Marhaban). [n]

---

## C20

**Q:** What causes the northern lights?

**Notes:** Charged solar wind particles guided by Earth's magnetic field excite oxygen/nitrogen in upper atmosphere; near polar regions.

### A

The northern lights (aurora borealis) happen when charged particles slam into gases in Earth's upper atmosphere. The energy for this comes from the Sun, and Earth's magnetic field steers the particles toward the poles.

How it works:
1. The Sun sends out particles. It constantly releases a stream of charged particles called the solar wind. Solar flares, coronal mass ejections (huge bursts of solar material) and fast wind from coronal holes (thinner regions of the Sun's outer atmosphere) add extra energy.
2. Earth's magnetic field takes the hit. The solar wind pushes on Earth's magnetic shield, the magnetosphere, and stores energy in it. This happens most strongly when the magnetic field carried by the solar wind points southward.
3. Particles speed down toward the poles. Electrons in the magnetosphere get accelerated and travel along magnetic field lines into rings around the north and south magnetic poles.
4. Collisions make light. These electrons hit oxygen and nitrogen atoms roughly 100–300+ km up. The atoms gain energy and then release it as light, much like a neon sign.

Colors:
- Green, the most common, comes from oxygen at about 100–250 km.
- Red comes from oxygen higher up.
- Blue and purple come from nitrogen.

Why you sometimes see it farther south: When solar activity is strong, such as during a geomagnetic storm, the aurora gets brighter and the ring spreads toward the equator. That's when people at mid-latitudes can see it. The same process in the Southern Hemisphere produces the aurora australis, or southern lights.

### B

The northern lights (aurora borealis) are caused by charged particles from the solar wind interacting with Earth's magnetosphere and atmosphere. These particles collide with oxygen and nitrogen atoms in the upper atmosphere, emitting light in various colors—typically green, red, or blue—depending on the type of gas and altitude [n].
