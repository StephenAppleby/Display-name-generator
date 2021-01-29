## Display name generator

This is a simple application which generates a random display name by combining adjectives, verbs and nouns. The point of the project was to practice making fetch calls to and from a server, as well as handling those calls on the server side. At this point, I consider this project complete as I have achieved what I set out to do.

Randomly generated names conform to this template:

"Adjective" || "Verb" + "Adjective" || "Verb" + "Noun"

The current implementation does not prevent duplicates in the first two words which could be achieved with a bit more logic, perhaps a while loop or a recursive function, however I don't feel the need to fix this as I have accomplished what I set out to do already.