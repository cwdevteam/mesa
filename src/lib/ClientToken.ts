'use client'

import { createHash } from "crypto";

export class ClientToken {
  private prefix: string;

  static generateToken(): string {
    const randomValues = new Uint8Array(32);
    window.crypto.getRandomValues(randomValues);
    return createHash('sha256')
      .update(randomValues.join(''))
      .digest('base64')
      .substring(0, 40)
  }

  constructor(prefix?: string) {
    this.prefix = prefix || '__MESA__/ClientToken/'
  }

  storageKey(id: string): string {
    return this.prefix + id
  }

  getToken(id: string): string {
    const k = this.storageKey(id)
    let token = localStorage.getItem(k);
    if (!token) {
      token = ClientToken.generateToken()
      this.setToken(id, token);
    }
    return token
  }

  protected setToken(id: string, token: string): void {
    const k = this.storageKey(id)
    localStorage.setItem(k, token);
  }

  rotateToken(id: string): { oldClientToken: string | null, newClientToken: string } {
    const newClientToken = ClientToken.generateToken();
    const oldClientToken = this.getToken(id);
    this.setToken(id, newClientToken);
    return { oldClientToken, newClientToken };
  }
}