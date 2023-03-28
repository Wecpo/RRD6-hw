import {
    Route,
    BrowserRouter,
    NavLink,
    useParams,
    Routes,
    Navigate
} from "react-router-dom";

const users = [{ id: `0` }, { id: `1` }, { id: `2` }, { id: `3` }, { id: `4` }];

const UsersList = () => {
    return (
        <>
            <h1>Users list</h1>
            {users.map((u) => (
                <NavLink to={`/users/${u.id}/profile`} key={u.id}>
                    <li key={u.id}>User {u.id}</li>
                </NavLink>
            ))}
            {
                <div>
                    <NavLink to="/">
                        <h2>Home Page</h2>
                    </NavLink>
                </div>
            }
        </>
    );
};

const UserEditPage = () => {
    const { id } = useParams();

    const anotherUser = (id) => {
        if (id === `4`) {
            return 1;
        }
        return Number(id) + 1;
    };

    return (
        <>
            <h1>Edit User Page</h1>
            <div>
                <NavLink to={`/users/${id}/profile`}>User profile Page</NavLink>
            </div>
            <div>
                <NavLink to="/users">Users list Page</NavLink>
            </div>
            <div>
                <NavLink to={`/users/${anotherUser(id)}/profile`}>
                    To another user Page
                </NavLink>
            </div>
        </>
    );
};

const UserPage = () => {
    const { id } = useParams();

    return (
        <>
            <h1>User Page</h1>
            <h2>user id: {users[id].id}</h2>
            <NavLink to="/users">Users list Page</NavLink>
            <div>
                <NavLink to={`/users/${id}/edit/`}>Edit User Page</NavLink>
            </div>
        </>
    );
};

const MainPage = () => {
    return (
        <>
            <h1>Main Page</h1>
            {
                <div>
                    <NavLink to="/users">Users list Page</NavLink>
                </div>
            }
        </>
    );
};

const UserPageLayout = () => {
    const { id } = useParams();
    const user = users.find((u) => u.id === id);
    if (user) {
        return (
            <Routes>
                <Route path={`profile`} element={<UserPage />} />
            </Routes>
        );
    } else {
        return <h1>User undefined</h1>;
    }
};

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/users/:id/edit" element={<UserEditPage />} />
                    <Route path="/" element={<MainPage />} />
                    <Route path="/users" element={<UsersList />} />
                    <Route path="/users/:id/*" element={<UserPageLayout />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
