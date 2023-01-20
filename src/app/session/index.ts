class Session {
  private username: string;

  private expiresAt: Date;

  constructor(username, expiresAt) {
    this.username = username;
    this.expiresAt = expiresAt;
  }

  isExpired(): boolean {
    return this.expiresAt < new Date();
  }
}

export default Session;
