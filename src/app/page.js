import { Separator } from "@/components/ui/separator";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import axios from "axios";
import Link from "next/link";

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}


export default async function Home() {
  // const resp = await fetch(process.env.NEXT_PUBLIC_BASE_URL + 'article/readArticleList/v1')
  const resp = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + 'article/readArticleList/v1',
    {
      "category": null,
      "fromId": -1,
      "selectRange": 10
  }
)
  return (
      <div className="flex justify-center rounded-md h-full w-full border-0">
        <TableBody>
            {
              resp.data.data.articles.map((article) => (
                <div>
                  <TableRow key={article.id} className="p-6 h-16">
                  {
                    <Link href='/auth/register'>
                      <TableCell>
                        {article.category}
                      </TableCell>
                      <TableCell>
                        {article.title}
                      </TableCell>
                      <TableCell>
                        {article.nickname}
                      </TableCell>
                      <TableCell>
                        {formatDate(article.last_modified_date)}
                      </TableCell>
                    </Link>
                  }
                </TableRow>
                <Separator/>
                </div>
              ))
            }
        </TableBody>
      </div>
  )
}
