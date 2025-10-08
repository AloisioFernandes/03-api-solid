import type { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d",
      },
    }
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/", // Quais rotas terão acesso ao cookie
      secure: true, // Só funciona em conexões HTTPS
      sameSite: true, // Impede que sites de terceiros tenham acesso ao cookie
      httpOnly: true, // Impede que o JavaScript do navegador tenha acesso ao cookie
    })
    .status(200)
    .send({ token });
}
