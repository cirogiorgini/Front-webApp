import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const GithubButton: React.FC = () => {
    const handleGitHubLogin = () => {
        window.location.href = 'http://localhost:8080/api/sessions/github';
    };

    return (
        <Button
            fullWidth
            variant="contained"
            startIcon={<GitHubIcon />}
            onClick={handleGitHubLogin}
            sx={{ marginBottom: 2, backgroundColor: '#424242' }}
        >
            Sign In With GitHub
        </Button>
    );
};

export default GithubButton;
