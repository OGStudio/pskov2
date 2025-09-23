plugins {
    kotlin("multiplatform") version "2.2.0"
}

repositories {
    mavenCentral()
}

kotlin {
    js {
        nodejs { }
        binaries.executable()
    }

    sourceSets {
        all {
            languageSettings {
                optIn("kotlin.js.ExperimentalJsExport")
            }
        }
        val jsMain by getting {
            dependencies {
                // Convert file name to MIME type
                implementation(npm("mime-types", "3.0.1"))
                // Open URL in browser
                implementation(npm("open", "8.4.2"))
            }
        }
    }
}

tasks.withType<Wrapper> {
    distributionType = Wrapper.DistributionType.BIN
}
