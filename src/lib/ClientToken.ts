'use client'

export class ClientToken {
  private storageKey: string;

  static generateToken(): string {
    const array = new Uint32Array(10);
    window.crypto.getRandomValues(array);
    return array.join('');
  }

  constructor(storageKey: string) {
    this.storageKey = storageKey;
    this.initToken()
  }

  protected initToken(): void {
    if (!this.getToken()) {
      this.setToken(ClientToken.generateToken());
    }
  }

  getToken(): string {
    let token = localStorage.getItem(this.storageKey);
    if (!token) {
      token = ClientToken.generateToken()
      this.setToken(token);
    }
    return token
  }

  protected setToken(token: string): void {
    localStorage.setItem(this.storageKey, token);
  }

  rotateToken(): { oldClientToken: string | null, newClientToken: string } {
    const newClientToken = ClientToken.generateToken();
    const oldClientToken = this.getToken();
    this.setToken(newClientToken);
    return { oldClientToken, newClientToken };
  }
}