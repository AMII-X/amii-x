import base64
from googleapiclient.discovery import build
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import os
import json 

sponsors = json.load(open("sponsors.json"))

def create_email(sender, recipient, subject, body):
    """Creates an email message for an individual recipient."""
    msg = MIMEMultipart()
    msg["From"] = sender
    msg["To"] = recipient 
    msg["Subject"] = subject

    msg.attach(MIMEText(body, "plain"))

    return {"raw": base64.urlsafe_b64encode(msg.as_bytes()).decode("utf-8")}

def send_emails(service, sender, recipients, subject, body):
    """Sends individual emails to each recipient."""
    for recipient in recipients:
        email = create_email(sender, recipient, subject, body)
        message = {"raw": email["raw"]}
        service.users().messages().send(userId="me", body=message).execute()
        print(f"Email sent to {recipient}")

SCOPES = ["https://www.googleapis.com/auth/gmail.send"]

def authenticate_gmail():
    """Authenticates with the Gmail API and returns a service object."""
    creds = None
    token_file = "token.json"

    if os.path.exists(token_file):
        creds = Credentials.from_authorized_user_file(token_file, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=8080)

        with open(token_file, "w") as token:
            token.write(creds.to_json())

    return build("gmail", "v1", credentials=creds)

if __name__ == "__main__":
    service = authenticate_gmail()
    sender_email = "amii.ensam@gmail.com"
    subject = "Demande de Sponsorship pour les Journées Inter-Instituts 2025"
    body = """Madame, Monsieur, 

Au nom du Comité Arts et Métiers Inter-Instituts, nous avons l'honneur de vous solliciter pour un partenariat dans le cadre des Journées Inter-instituts 2025, un événement incontournable réunissant les écoles d'ingénieurs du Maroc. Cet événement se déroulera sur trois jours à l'ENSAM Meknès et comprendra des compétitions sportives, des conférences, ainsi qu'une soirée exceptionnelle avec un artiste de renommée nationale.

En collaboration avec la Ligue Régionale du Sport universitaire, nous nous engageons à organiser des compétitions sportives de haut niveau, tout en offrant des moments conviviaux et enrichissants pour tous les participants. Cette initiative attire chaque année plusieurs centaines d'étudiants et de professionnels du secteur, ce qui en fait un lieu privilégié pour le développement de nouvelles synergies. 

Nous vous proposons de devenir sponsor officiel de cet événement et de bénéficier d'une visibilité importante auprès de la communauté d'ingénieurs et de jeunes talents. Nous avons élaboré différentes formules de sponsoring qui vous permettront de mettre en avant votre entreprise tout au long de l'événement, à travers des supports de communication, des affichages lors des compétitions et des activités culturelles, ainsi que lors de la soirée avec l'artiste invité. 

Nous serions ravis de vous fournir plus de détails et d'échanger sur les différentes possibilités de collaboration. Votre soutien serait un atout précieux pour la réussite de cette grande rencontre. 

Cordialement, 

GUEDDAOUI RANIA 
Chef de cellule contact et sponsoring
Comité Arts et Métiers Inter-Instituts 
ENSAM Meknès"""

    send_emails(service, sender_email, sponsors, subject, body)
