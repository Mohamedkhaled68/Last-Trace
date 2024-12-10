import { Navigate, Route, Routes } from "react-router-dom";
import { CasePage, Home, Login, Settings, Signup } from "./pages";
import ProtectedRoute from "./routes/ProtectedRoute";
import {
    AccidentCases,
    AssaultCases,
    CybercrimeCases,
    MedicalNegligenceCases,
    MurderCases,
    TheftCases,
} from "./routes";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route index element={<Navigate to="murder-cases" replace />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="murder-cases"
                        element={
                            <ProtectedRoute>
                                <MurderCases />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="murder-cases/:caseId" element={<CasePage />} />
                    <Route path="theft-cases/:caseId" element={<CasePage />} />
                    <Route path="cyber-crimes/:caseId" element={<CasePage />} />
                    <Route
                        path="medical-negligence/:caseId"
                        element={<CasePage />}
                    />
                    <Route
                        path="assault-cases/:caseId"
                        element={<CasePage />}
                    />
                    <Route
                        path="accident-cases/:caseId"
                        element={<CasePage />}
                    />

                    <Route
                        path="theft-cases"
                        element={
                            <ProtectedRoute>
                                <TheftCases />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="cyber-crimes"
                        element={
                            <ProtectedRoute>
                                <CybercrimeCases />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="medical-negligence"
                        element={
                            <ProtectedRoute>
                                <MedicalNegligenceCases />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="assault-cases"
                        element={
                            <ProtectedRoute>
                                <AssaultCases />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="accident-cases"
                        element={
                            <ProtectedRoute>
                                <AccidentCases />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="settings"
                        element={
                            <ProtectedRoute>
                                <Settings />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </>
    );
};

export default App;
