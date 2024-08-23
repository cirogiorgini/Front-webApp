import Loader from "../Loaders/Loader";
import { useEffect, useState } from "react";
import { User } from "../../models/User.model";
import UsersList from "./UsersList";



const UsersListContainer: React.FC = () => {

    const [error, setError] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const fetchUsers = async () => {
            setIsLoading(true)

            try {
                const response = await fetch('http://localhost:8080/api/users')
                const users = (await response.json()) as User[];
                setUsers(users)
            } catch (error: any) {
                setError(error)
            } finally {
                setIsLoading(false)
            }

        };

        fetchUsers();
    }, [])

    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <div>Something wen't wrong! Please try again</div>
    }

  return (
    <UsersList users={users}/>
  )
}

export default UsersListContainer