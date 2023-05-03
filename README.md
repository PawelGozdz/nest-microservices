SSL

# Generate certificates

Install OpenSSL if you haven't already. OpenSSL is a command-line tool that can be used to generate and manage SSL/TLS certificates.

Generate a root CA certificate. The root CA certificate is used to sign other certificates in your system. You can generate a root CA certificate using the following command:

```
openssl req -new -x509 -keyout ca.key -out ca.crt -days 365 -nodes
```

This command will generate a new self-signed root CA certificate that is valid for 365 days. It will also create a private key file (ca.key) and a certificate file (ca.crt) that you will need to sign other certificates.

Generate a server certificate for users-service. The server certificate is used by users-service to identify itself to clients. You can generate a server certificate using the following command:

```
openssl req -new -newkey rsa:2048 -nodes -keyout server.key -out server.csr
```

This command will create a private key file (server.key) and a certificate signing request file (server.csr) for the server certificate.

Sign the server certificate with the root CA certificate. You can sign the server certificate using the following command:

```
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365
```

This command will sign the server certificate with the root CA certificate and create a new server certificate file (server.crt) that can be used by users-service.

Generate a client certificate for api-gateway. The client certificate is used by api-gateway to identify itself to servers, such as users-service. You can generate a client certificate using the following command:

```
openssl req -new -newkey rsa:2048 -nodes -keyout client.key -out client.csr
```

This command will create a private key file (client.key) and a certificate signing request file (client.csr) for the client certificate.

Sign the client certificate with the root CA certificate. You can sign the client certificate using the following command:

```
openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365
```

This command will sign the client certificate with the root CA certificate and create a new client certificate file (client.crt) that can be used by api-gateway.

Copy the server certificate and key to the users-service directory. You should copy the server.crt and server.key files to the directory where users-service is located.

Copy the client certificate and key to the api-gateway directory. You should copy the client.crt and client.key files to the directory where api-gateway is located.

Once you have generated the certificates and copied them to the appropriate directories, you can modify the ClientsModule options in both api-gateway and users-service to include the TLS options that reference the generated certificates.

Note that these certificates are for testing purposes only and should not be used in production environments. In production, you should obtain certificates from a trusted certificate authority (CA) to ensure the security of your system.

The server.csr and client.csr files are certificate signing requests, which are used to obtain a signed certificate from a certificate authority. In our case, we are self-signing the certificates, so we do not need these files.

The ca.crt and ca.key files are the root CA certificate and private key that you have generated. These files are used to sign and verify the certificates for api-gateway and users-service. You should keep these files secure and not share them with anyone who should not have access to them.
