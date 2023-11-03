terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "5.4.0"
    }
  }
}

provider "google" {
  # credentials = file("<NAME>.json")

  project = "qobalt-403922"
  region  = "europe-west2"
}


resource "google_cloud_run_service" "default" {
  name     = "cloudrun-srv"
  location = "europe-west2"

  template {
    spec {
      containers {
        image = "us-docker.pkg.dev/cloudrun/container/hello"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_project_service" "project" {
  project = "qobalt-403922"
  service = "iam.googleapis.com"

  timeouts {
    create = "30m"
    update = "40m"
  }

  disable_dependent_services = true
}