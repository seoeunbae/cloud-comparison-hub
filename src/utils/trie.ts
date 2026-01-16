export class TrieNode {
  children: { [key: string]: TrieNode } = {};
  isEndOfWord: boolean = false;
  word: string = "";

  constructor() {}
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
    node.word = word; // Store original case
  }

  search(prefix: string): string[] {
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }
    return this.collectAllWords(node);
  }

  private collectAllWords(node: TrieNode, results: string[] = []): string[] {
    if (node.isEndOfWord) {
      results.push(node.word);
    }
    for (const char in node.children) {
      this.collectAllWords(node.children[char], results);
    }
    return results;
  }
}

export const awsServices = [
  "EC2 (Compute)", "S3 (Storage)", "Lambda (Compute)", "RDS (Database)", "DynamoDB (Database)", 
  "CloudFront (Networking)", "VPC (Networking)", "Route 53 (Networking)", "IAM (Security)", 
  "SNS (Integration)", "SQS (Integration)", "Kinesis (Analytics)", "Redshift (Database)", 
  "Athena (Analytics)", "Glue (Analytics)", "SageMaker (ML)", "Rekognition (ML)", "Polly (ML)", 
  "Lex (ML)", "Comprehend (ML)", "Translate (ML)", "Transcribe (ML)", "Forecast (ML)", 
  "Personalize (ML)", "Textract (ML)", "Kendra (ML)", "CodeCommit (DevTools)", "CodeBuild (DevTools)", 
  "CodeDeploy (DevTools)", "CodePipeline (DevTools)", "CloudWatch (Management)", "CloudTrail (Management)", 
  "Config (Management)", "OpsWorks (Management)", "Service Catalog (Management)", 
  "Systems Manager (Management)", "Trusted Advisor (Management)", "Shield (Security)", "WAF (Security)", 
  "KMS (Security)", "Secrets Manager (Security)", "GuardDuty (Security)", "Inspector (Security)", 
  "Macie (Security)", "Artifact (Security)", "Certificate Manager (Security)", 
  "Directory Service (Security)", "Firewall Manager (Security)", "RAM (Management)", 
  "Resource Groups (Management)", "CloudFormation (Management)", "CDK (DevTools)", "SAM (DevTools)", 
  "Amplify (Mobile)", "AppSync (Mobile)", "Device Farm (Mobile)", "Pinpoint (Marketing)", 
  "SES (Marketing)", "WorkSpaces (Desktop)", "AppStream 2.0 (Desktop)", "WorkDocs (Desktop)", 
  "WorkMail (Desktop)", "Chime (Communication)", "Connect (Communication)", "IoT Core (IoT)", 
  "IoT Device Management (IoT)", "IoT Analytics (IoT)", "IoT Events (IoT)", "IoT SiteWise (IoT)", 
  "IoT Things Graph (IoT)", "IoT Greengrass (IoT)", "FreeRTOS (IoT)", "Ground Station (Satellite)", 
  "Braket (Quantum)", "Outposts (Hybrid)", "Snowball (Migration)", "Snowmobile (Migration)", 
  "Direct Connect (Networking)", "Global Accelerator (Networking)", "Transit Gateway (Networking)", 
  "Client VPN (Networking)", "Site-to-Site VPN (Networking)", "PrivateLink (Networking)", 
  "App Mesh (Networking)", "Cloud Map (Networking)", "Elastic Beanstalk (Compute)", "Fargate (Compute)", 
  "EKS (Compute)", "ECS (Compute)", "ECR (Compute)", "Batch (Compute)", "Lightsail (Compute)", 
  "Step Functions (Integration)", "EventBridge (Integration)", "MSK (Analytics)", "MQ (Integration)", 
  "AppFlow (Integration)", "Honeycode (No-Code)", "Lookout for Vision (ML)", "Lookout for Equipment (ML)", 
  "Lookout for Metrics (ML)", "Panorama (ML)", "Monitron (ML)", "Proton (Management)", 
  "Nimble Studio (Media)", "Location Service (Mobile)", "FinSpace (Finance)"
];

export const gcpServices = [
  "Compute Engine (Compute)", "Cloud Storage (Storage)", "Cloud Functions (Compute)", 
  "Cloud SQL (Database)", "Cloud Spanner (Database)", "Cloud Bigtable (Database)", 
  "Firestore (Database)", "Memorystore (Database)", "BigQuery (Analytics)", "Pub/Sub (Integration)", 
  "Dataflow (Analytics)", "Dataproc (Analytics)", "Cloud Composer (Analytics)", 
  "Cloud Data Fusion (Analytics)", "Cloud Life Sciences (Healthcare)", "Cloud Healthcare API (Healthcare)", 
  "Cloud Video Intelligence (ML)", "Cloud Vision (ML)", "Cloud Natural Language (ML)", 
  "Cloud Translation (ML)", "Cloud Text-to-Speech (ML)", "Cloud Speech-to-Text (ML)", 
  "Cloud Talent Solution (ML)", "Dialogflow (ML)", "AutoML (ML)", "AI Platform (ML)", "Vertex AI (ML)", 
  "Cloud Build (DevTools)", "Cloud Source Repositories (DevTools)", "Cloud Deployment Manager (Management)", 
  "Cloud Monitoring (Management)", "Cloud Logging (Management)", "Cloud Trace (Management)", 
  "Cloud Debugger (Management)", "Cloud Profiler (Management)", "Identity and Access Management (Security)", 
  "Cloud Identity (Security)", "Cloud Resource Manager (Management)", "Cloud Billing (Management)", 
  "Cloud Security Command Center (Security)", "Cloud Armor (Security)", "Cloud DLP (Security)", 
  "Cloud Key Management Service (Security)", "Cloud HSM (Security)", "Cloud Secret Manager (Security)", 
  "Cloud Identity-Aware Proxy (Security)", "Cloud Asset Inventory (Management)", 
  "Cloud Audit Logs (Management)", "Cloud Endpoints (API)", "Apigee (API)", "API Gateway (API)", 
  "Cloud Load Balancing (Networking)", "Cloud DNS (Networking)", "Cloud CDN (Networking)", 
  "Cloud Interconnect (Networking)", "Cloud VPN (Networking)", "Cloud Router (Networking)", 
  "Cloud NAT (Networking)", "Cloud Service Mesh (Networking)", "Cloud Traffic Director (Networking)", 
  "Cloud Domains (Networking)", "Cloud Run (Compute)", "Anthos (Hybrid)", 
  "Google Kubernetes Engine (Compute)", "App Engine (Compute)", "Cloud Batch (Compute)", 
  "Cloud Workstations (Compute)", "Cloud TPU (ML)", "Cloud GPUs (Compute)", "Eventarc (Integration)", 
  "Workflows (Integration)", "Cloud Tasks (Integration)", "Cloud Scheduler (Management)", 
  "Firebase (Mobile)", "Looker (Analytics)", "Data Studio (Analytics)", "Google Maps Platform (Maps)"
];
