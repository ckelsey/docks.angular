import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DocksModule } from './modules/docks/docks.module';

enableProdMode()

platformBrowserDynamic().bootstrapModule(DocksModule)
  .catch(err => console.log(err));
