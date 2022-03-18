
export interface Data {
    WEBSITE:        Website[];
    KEYCLOAK:       Keycloak[];
    ARBEITSSTUNDEN: Arbeitsstunden[];
}

export interface Arbeitsstunden {
    first_name: string;
    last_name:  string;
    email:      string;
}

export interface Keycloak {
    id:             string;
    Email:          string;
    Email_verified: string | null;
    enabled:        string | null;
    first_name:     string;
    last_name:      string;
    username:       string;
}

export enum EmailVerified {
    Aa = "AA==",
    Aq = "AQ==",
}

export interface Website {
    id:            string;
    username:      string;
    first_name:    string;
    last_name:     string;
    email:         string;
    is_active:     boolean;
    profile_image: string;
    status:        string;
}