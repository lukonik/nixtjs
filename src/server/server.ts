import { AppServerModule } from '../client/app/app.server.module';
import 'zone.js/dist/zone-node';
import '@angular/platform-server/init';

import { renderModule } from '@angular/platform-server';
import { AppModule } from '../client/app/app.module';
import { readFileSync } from 'fs';
const fileSync = readFileSync('../nixt/index.html', 'utf-8');
import * as http from 'http';
import express from 'express';
import * as path from 'path';

const app = express();

app.use('*.*', express.static(path.join(__dirname, '../nixt')));

app.get('*', (req: any, res: any) => {
  renderModule(AppServerModule, {
    document: fileSync,
  })
    .then((d) => {
      res.end(d);
    })
    .catch((e) => {
      res.end(fileSync);
    });
});

app.listen(3000);
