import { Injectable } from '@angular/core';
import { Database, ref, set, push } from '@angular/fire/database';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private db: Database) {}

  async addUser(email: string, username: string, password: string, role: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const hashedRole = await bcrypt.hash(role, 5);

    const userRef = push(ref(this.db, 'users'));

    // Guardar en Firebase
    return set(userRef, {
      email,
      username,
      password: hashedPassword,
      role: hashedRole
    });
  }
}
  