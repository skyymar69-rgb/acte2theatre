import type { SchemaTypeDefinition } from "sanity";

import { spectacle } from "./spectacle";
import { categorie } from "./categorie";
import { atelier } from "./atelier";
import { actualite } from "./actualite";
import { pageStatique } from "./pageStatique";
import { parametres } from "./parametres";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  spectacle,
  categorie,
  atelier,
  actualite,
  pageStatique,
  parametres,
];
