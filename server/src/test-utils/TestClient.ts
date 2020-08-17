import { RegisterInputType } from "../modules/user/register/RegisterInputType";
import rp from "request-promise";
import { CreatePostInputType } from "../modules/post/postActions/CreatePostInputType";
import { UpdatePostInputType } from "../modules/post/postActions/UpdatePostInputType";

const registerMutation = ({
  email,
  firstName,
  lastName,
  password
}: RegisterInputType) => `
  mutation{
    register(data:{firstName:"${firstName}",lastName:"${lastName}",email:"${email}",password:"${password}"})
  }
`;

const loginMutation = (email: string, password: string) => `
  mutation{
    login(email:"${email}",password:"${password}")
  }
`;

const logoutMutation = () => `
  mutation{
    logout
  }
`;

const logoutAllMutation = () => `
  mutation{
    logoutAll
  }
`;

const createPostMutation = ({ title, content }: CreatePostInputType) => `
  mutation {
    createPost(postData:{title:"${title}",content:"${content}"})
  }
`;

const updatePostMutation = (
  id: string,
  { title, content }: Partial<UpdatePostInputType>
) => {
  const updateData = [];
  if (title) {
    updateData.push(`title:"${title}"`);
  }
  if (content) {
    updateData.push(`content:"${content}"`);
  }

  return `
    mutation {
      updatePost(id:"${id}",updates:{${updateData.join(",")}})
    }
  `;
};

const deletePostMutation = (id: string) => `
  mutation {
    deletePost(id:"${id}")
  }
`;

const meQuery = () => `
  query {
    me {
      id
      firstName
      lastName
      email
      posts{
        id
        title
        content
      }
    }
  }
  `;

const postQuery = (postId: string) => `
  query {
    post(id:"${postId}"){
      title
      content
      author{
        firstName
        lastName
        email
      }
    }
  }
`;

const postsQuery = (authorId: string) => `
  query {
    posts(authorId:"${authorId}"){
      title
      content
      author{
        firstName
        lastName
        email
      }
    }
  }
`;

export class TestClient {
  url: string;
  options: {
    jar: any;
    withCredentials: boolean;
    json: boolean;
  };

  constructor(url: string, withCredentials: boolean = true) {
    this.url = url;
    this.options = {
      withCredentials,
      jar: rp.jar(),
      json: true
    };
  }

  async register({ email, firstName, lastName, password }: RegisterInputType) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: registerMutation({
          email,
          password,
          firstName,
          lastName
        })
      }
    });
  }

  async login(email: string, password: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: loginMutation(email, password)
      }
    });
  }

  async logout() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: logoutMutation()
      }
    });
  }

  async logoutAll() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: logoutAllMutation()
      }
    });
  }

  async createPost(postData: CreatePostInputType) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: createPostMutation(postData)
      }
    });
  }

  async updatePost(id: string, postData: Partial<CreatePostInputType>) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: updatePostMutation(id, postData)
      }
    });
  }

  async deletePost(id: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: deletePostMutation(id)
      }
    });
  }

  async me() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: meQuery()
      }
    });
  }

  async post(postId: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: postQuery(postId)
      }
    });
  }

  async posts(authorId: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: postsQuery(authorId)
      }
    });
  }

  setCookies(newValue: boolean) {
    this.options.withCredentials = newValue;
  }
}
