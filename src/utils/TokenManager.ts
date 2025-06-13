class TokenManager {
  private _refreshToken: string = '';
  private _accessToken: string = '';

  setAccessToken(token: string) {
    this._accessToken = token;
  }

  getAccessToken() {
    return this._accessToken;
  }

  setRefreshToken(token: string) {
    this._refreshToken = token;
    localStorage.setItem('refreshToken', this._refreshToken);
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken') || '';
  }

  public removeTokens() {
    this._accessToken = '';
    this._refreshToken = '';
    localStorage.removeItem('refreshToken');
  }
}

export const tokenManager = new TokenManager();
