import "dotenv/config";

const serviceAccountKey = {
  type: "service_account",
  project_id: "notion-but-better",
  private_key_id: "1ed173062c6b98dfc6ef56aea54cd5aef61e23be",
  private_key: process.env.EXPRESS_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email:
    "firebase-adminsdk-ikuju@notion-but-better.iam.gserviceaccount.com",
  client_id: "108908249923037526444",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ikuju%40notion-but-better.iam.gserviceaccount.com",
};

export default serviceAccountKey;
