/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/home/index';

const repoData = {
  id: 1,
  node_id: 'MDEwOlJlcG9zaXRvcnkx',
  name: 'test',
  full_name: 'example/test',
  private: false,
  owner: {
    login: 'example',
    id: 1,
    node_id: 'MDQ6VXNlcjE=',
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/example',
    html_url: 'https://github.com/example',
    followers_url: 'https://api.github.com/users/example/followers',
    following_url:
      'https://api.github.com/users/example/following{/other_user}',
    gists_url: 'https://api.github.com/users/example/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/example/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/example/subscriptions',
    organizations_url: 'https://api.github.com/users/example/orgs',
    repos_url: 'https://api.github.com/users/example/repos',
    events_url: 'https://api.github.com/users/example/events{/privacy}',
    received_events_url: 'https://api.github.com/users/example/received_events',
    type: 'User',
    site_admin: false,
  },
  html_url: 'https://github.com/example/test',
  description:
    '**Grit is no longer maintained. Check out libgit2/rugged.** Grit gives you object oriented read/write access to Git repositories via Ruby.',
  fork: false,
  url: 'https://api.github.com/repos/example/test',
  forks_url: 'https://api.github.com/repos/example/test/forks',
  keys_url: 'https://api.github.com/repos/example/test/keys{/key_id}',
  collaborators_url:
    'https://api.github.com/repos/example/test/collaborators{/collaborator}',
  teams_url: 'https://api.github.com/repos/example/test/teams',
  hooks_url: 'https://api.github.com/repos/example/test/hooks',
  issue_events_url:
    'https://api.github.com/repos/example/test/issues/events{/number}',
  events_url: 'https://api.github.com/repos/example/test/events',
  assignees_url: 'https://api.github.com/repos/example/test/assignees{/user}',
  branches_url: 'https://api.github.com/repos/example/test/branches{/branch}',
  tags_url: 'https://api.github.com/repos/example/test/tags',
  blobs_url: 'https://api.github.com/repos/example/test/git/blobs{/sha}',
  git_tags_url: 'https://api.github.com/repos/example/test/git/tags{/sha}',
  git_refs_url: 'https://api.github.com/repos/example/test/git/refs{/sha}',
  trees_url: 'https://api.github.com/repos/example/test/git/trees{/sha}',
  statuses_url: 'https://api.github.com/repos/example/test/statuses/{sha}',
  languages_url: 'https://api.github.com/repos/example/test/languages',
  stargazers_url: 'https://api.github.com/repos/example/test/stargazers',
  contributors_url: 'https://api.github.com/repos/example/test/contributors',
  subscribers_url: 'https://api.github.com/repos/example/test/subscribers',
  subscription_url: 'https://api.github.com/repos/example/test/subscription',
  commits_url: 'https://api.github.com/repos/example/test/commits{/sha}',
  git_commits_url:
    'https://api.github.com/repos/example/test/git/commits{/sha}',
  comments_url: 'https://api.github.com/repos/example/test/comments{/number}',
  issue_comment_url:
    'https://api.github.com/repos/example/test/issues/comments{/number}',
  contents_url: 'https://api.github.com/repos/example/test/contents/{+path}',
  compare_url:
    'https://api.github.com/repos/example/test/compare/{base}...{head}',
  merges_url: 'https://api.github.com/repos/example/test/merges',
  archive_url:
    'https://api.github.com/repos/example/test/{archive_format}{/ref}',
  downloads_url: 'https://api.github.com/repos/example/test/downloads',
  issues_url: 'https://api.github.com/repos/example/test/issues{/number}',
  pulls_url: 'https://api.github.com/repos/example/test/pulls{/number}',
  milestones_url:
    'https://api.github.com/repos/example/test/milestones{/number}',
  notifications_url:
    'https://api.github.com/repos/example/test/notifications{?since,all,participating}',
  labels_url: 'https://api.github.com/repos/example/test/labels{/name}',
  releases_url: 'https://api.github.com/repos/example/test/releases{/id}',
  deployments_url: 'https://api.github.com/repos/example/test/deployments',
};

jest.mock('axios', () => {
  return Object.assign(jest.fn(), {
    get: () =>
      Promise.resolve({
        data: [
          repoData,
          {
            ...repoData,
            id: 2,
          },
        ],
      }),
  });
});

describe('<HomePage />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should renders home page', async () => {
    const { baseElement } = await act(async () =>
      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
      ),
    );
    expect(baseElement).toBeInTheDocument();
  });

  it('should render the search component', async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
      ),
    );
    const searchElement = screen.getByTestId('search');
    expect(searchElement).toBeInTheDocument();
  });

  it('should render repositories on the home page', async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
      ),
    );
    const repositoryElement = screen.getByTestId(`repository-${repoData.id}`);
    expect(repositoryElement).toBeInTheDocument();
  });
});
