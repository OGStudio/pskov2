plugins {
    kotlin("multiplatform") version "2.2.0"
}

repositories {
    mavenCentral()
}

kotlin {
    js {
        browser { }
        binaries.executable()
    }

    sourceSets {
        all {
            languageSettings {
                optIn("kotlin.js.ExperimentalJsExport")
            }
        }
        val commonMain by getting {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.9.0")
            }
        }
    }
}

tasks.withType<Wrapper> {
    distributionType = Wrapper.DistributionType.BIN
}
