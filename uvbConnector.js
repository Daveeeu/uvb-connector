const axios = require('axios');

class UVBConnector {
    constructor(publicApiKey, privateApiKey, production = true) {
         this.baseUrl = production ? 'https://utanvet-ellenor.hu/api/v1/signals/' : 'https://sandbox.utanvet-ellenor.hu/api/v1/signals/';
         this.publicApiKey = publicApiKey;
         this.privateApiKey = privateApiKey;
    }

    async get(email) {
        if (!this._validateEmail(email)) {
            throw new Error('Hibás e-mail cím.');
        }

        try {
            await this._checkUVBService(email);
            return this.response;
        } catch (error) {
            throw new Error(`UVB Service ellenőrzés hiba: ${error.message}`);
        }
    }

    async post(email, outcome) {
        try {
            await this._submitToUVBService(email, outcome);
            return this.response;
        } catch (error) {
            throw new Error(`UVB Service küldés hiba: ${error.message}`);
        }
    }

    async _checkUVBService(email,threshold) {
        try {
            const hashedEmail = await this._hashEmail(email);
            const payload = {
                threshold: threshold
            };

            const response = await axios.post(`${this.baseUrl}${hashedEmail}`, payload, {
                auth: {
                    username: this.publicApiKey,
                    password: this.privateApiKey
                }
            });

            this.response = response.data;
        } catch (error) {
            throw new Error(`UVB Service ellenőrzés hiba: ${error.message}`);
        }
    }

    async _submitToUVBService(email, outcome) {
        const payload = {
            emailHash: await this._hashEmail(email),
            outcome: outcome
        };

        try {
            const response = await axios.post(this.baseUrl, {
                auth: {
                    username: this.publicApiKey,
                    password: this.privateApiKey
                },
                data: payload
            });

            this.response = response.data;
        } catch (error) {
            throw new Error(`UVB Service ellenőrzés hiba: ${error.message}`);
        }
    }

    _hashEmail(email) {
        return require('crypto').createHash('sha256').update(email).digest('hex');
    }

    _validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
}

module.exports = UVBConnector;
