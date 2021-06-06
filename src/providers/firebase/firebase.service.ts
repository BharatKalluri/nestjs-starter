import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServiceAccount } from 'firebase-admin/lib/credential';
import { app } from 'firebase-admin/lib/firebase-namespace-api';
import * as admin from 'firebase-admin';
import { auth } from 'firebase-admin/lib/auth';

@Injectable()
export class FirebaseService {
  firebaseApp: app.App;

  constructor(private readonly configService: ConfigService) {
    const appCredentials: ServiceAccount = {
      projectId: this.configService.get<string>('FIREBASE_APP_PROJECT_ID'),
      clientEmail: this.configService.get<string>('FIREBASE_APP_CLIENT_EMAIL'),
      privateKey: this.configService.get<string>('FIREBASE_APP_PRIVATE_KEY'),
    };
    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(appCredentials),
    });
  }

  async verifyUserWithToken(token: string): Promise<auth.DecodedIdToken> {
    return await this.firebaseApp.auth().verifyIdToken(token);
  }
}
