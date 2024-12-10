interface CaseDetails {
    type: string;
    place: string;
    date: string;
    description: string;
}

interface Suspect {
    name: string;
    personalDescriptions: string;
    role: string;
    description: string;
}

interface Witness {
    name: string;
    role: string;
    testimonies: string;
}

interface Victim {
    name: string;
    description: string;
}

interface EvidenceDescription {
    evidence: string;
    description: string;
}

interface PhysicalEvidence {
    attachedGuides: string[];
    evidenceDescription: EvidenceDescription[];
    collectionMethods: string[];
    evidencePlace: string[];
}

interface InvestigationAction {
    investigationSteps: string[];
    decisions: string[];
}

interface EvidenceAnalysis {
    evidenceAnalysis: string[];
    evidencePrediction: string[];
    preliminaryConclusions: string[];
}

interface Attachment {
    id: number;
    description: string;
    image: string;
}

export interface Case {
    id: number;
    title: string;
    type: string;
    image: string;
    publisher: string;
    articleDate: string;
    caseDetails: CaseDetails;
    interestedParties: {
        suspects: Suspect[];
        Witnesses: Witness[];
        victims: Victim[];
    };
    physicalEvidence: PhysicalEvidence;
    actions: InvestigationAction;
    results: EvidenceAnalysis;
    recommendations: string[];
    attachments: Attachment[];
}
