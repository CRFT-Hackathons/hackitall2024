const axios = require("axios");
const jwt = require('jsonwebtoken');

const credJson = JSON.stringify({
    "type": "service_account",
    "project_id": "emotionalanalizer",
    "private_key_id": "bd05dec1b215fdde2d734e4211a0af7159fb7522",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMLw9hPISUNpRf\nihvaoUf45xEBzXqq+QbNzs4ZopzckTQnveWWm63iXBOhlPh/VtObCkNhQc8WUTa2\nNEOACQY1VVmH77hwVbjoh5gtI/gOtHvkMoxCKUK3PZrNp9FKoGNVaY/YVPHVtIxE\n/7iBDOw9dh8TYuMqQnDePWlPfhTa39DMw6+Ywey9sMlvBL2zslJGiWkiWhiFavcI\ny/enm+9wem9KIrJsX7jzVk/5ZhR8+F7yxV5WgCFBrc/ve9Zg3/PKJwkwRqXH4Mcq\nyN3No3Alpma6zwiaf6yXNTcEak5cLQmi5u9/TcV8Oqa16KZCZ9JYsBZKoQtN2y+6\n24jQFXv7AgMBAAECggEAH4HvjKCrELfvY2LLc4xJr+XwIOgVUsbEvwN3mEsYi4y4\nkJ1kDT6OsYxl1xxG0FeUpasKxLpD+3yixbEA7YP2+knmW+yo+GSx+OfbmrOfNp2x\nNIB8VkVJrz8JYUzRJgPj8C0u7kIFY2XN82PGk9trpPxSRUqQJVhFVHYDhym8jB2Q\n4ukhTd8jHBXoZj2eKgGNMBH5ScixfGnD2FngIaJVAuZDojXn/VWgo1bVnXncyRxo\n2xL+9aDa1XeBMWwbX25zf/PSj/oBQ3yl63Dn8FoR1QA2MO52n6QbKZttsTngAwZI\nXSl3MiVrNLQ6flIU6ja9yRm5IL/rf57rG+aYiqTrEQKBgQDrTinD6xaLL/UBexuy\nhCNZRjbkdQL09Wt0ixD9fKshuK1ZEWWmPGC04k9u911C92MBktER36gT/YOWiYzx\nLI62W30G7sToq27Tn24E+gBvuuws/HkcrgLUXxIm6YvKcHNlZgvT6F62zFLMyCQr\n6W4fPG63qiKgNIz96XBVRO6a4wKBgQDeJDRn/sOh3uo4StaHaS4kUrCZ5XY+MKjN\ni0fJWXs0NVN3D5B29KUGhda7ov5oZMWJvOkvXNnp0Y9jKwUgTH8iyrKNSQK7h3mJ\nBV9eWe1RmNKzBN557rJjeoU/htga2Fo/rfAIibrM6xqgRmcDSd8lNFDoGFQwOu/o\nLzBpQPHuCQKBgC5AdPEvuoStbolV+4HBe3lG1e9eGLCxtOd5lmNdJ/4+4MQLKWHd\nqFylx1tWgBxzqCBdDX9n6Q/U2xKyAuQ9D+hEX3UHZekeGXC7e9K6mW9c3KOTFPNQ\nOPopndXMPlASfnxF7LlAia2AyB28kW+YOK8nH9Q2OwwmiDg4tH3uSMBlAoGAQpPj\nSQ/oHkmrNTfo2CjD9Yr69wT4zWbUENafq08wR9N7soFtsNld5HiUhSQyz6L0OXXv\nBYz0msl+CiDIpoeGyyypGwM42G+gE1sS3DpjkEMXUyQwcacCvCHqccG+Xz1cvx0o\nhcaRv/zuu/6dvTSUtpfZb9Zq1RG0+Ye7ILCgUdECgYEAo7QcfqDuOd5A6QTA67Ov\nqqYI9IQxHK9d7jQNE+MbDW6rSyltLxGHE2xM3yIEfcBVZ5SRfOgzMSoKXBaNoR6d\neQI/73aPkZKAST0aEU0A+s77vl3Hxrr9bHYWVXpblwEFaXYEKqaLnNCYdQAFQQ50\nfygpTxCSB805uC7dCrQbIH0=\n-----END PRIVATE KEY-----\n",
    "client_email": "hackitall@emotionalanalizer.iam.gserviceaccount.com",
    "client_id": "113527764273247439448",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/hackitall%40emotionalanalizer.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  });

const { client_email, private_key, private_key_id } = JSON.parse(credJson);

const currentDate = Math.floor(new Date().getTime() / 1000);

const url = "https://oauth2.googleapis.com/token";
const SCOPE = {
    "read-only": "https://www.googleapis.com/auth/devstorage.read_only",
    "read-write": "https://www.googleapis.com/auth/devstorage.read_write",
    "full-control": "https://www.googleapis.com/auth/devstorage.full_control",
    "cloud-platform.read-only": "https://www.googleapis.com/auth/cloud-platform.read-only",
    "cloud-platform": "https://www.googleapis.com/auth/cloud-platform"
};

const payload = {
    iss: client_email,
    scope: SCOPE["cloud-platform"],  // pick desired scope
    aud: url,
    exp: currentDate + 3600,
    iat: currentDate
};

const assertion = jwt.sign(payload, private_key, { algorithm: 'RS256', keyid: private_key_id });

const data = {
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion
};

axios.post(url, data, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
    .then((response) => {
        console.log("SUCCESS, token: " + response.data.access_token);
        return response.data.access_token;
    })
    .catch((error) => {
        console.error(error)
        return undefined;
    });

async function getAccessToken() {
    try {
        const response = await axios.post(url, data, {
            headers: {'content-type': 'application/x-www-form-urlencoded'}
        });
        console.log("SUCCESS, token: " + response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

module.exports = getAccessToken;