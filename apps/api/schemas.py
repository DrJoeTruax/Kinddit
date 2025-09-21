from pydantic import BaseModel
class UserIn(BaseModel): handle: str
class UserOut(BaseModel): id: int; handle: str
class CommunityIn(BaseModel): name: str; title: str
class CommunityOut(BaseModel): id:int; name:str; title:str
class PostIn(BaseModel): community_id:int; author_id:int|None=None; title:str; body:str
class PostOut(BaseModel): id:int; community_id:int; author_id:int|None; title:str; body:str; score:int
class CommentIn(BaseModel): post_id:int; author_id:int|None=None; parent_id:int|None=None; body:str
class CommentOut(BaseModel): id:int; post_id:int; author_id:int|None; parent_id:int|None; body:str; score:int
