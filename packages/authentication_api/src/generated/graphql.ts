import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Big Int Custom Scalar */
  BigInt: any;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type AddModeratorInput = {
  application_id: Scalars['String'];
  moderator_id: Scalars['String'];
};

export type AddPinnedCommentInput = {
  comment_id: Scalars['String'];
  thread_id: Scalars['String'];
};

export type AddUserToActiveUsersInput = {
  thread_id: Scalars['String'];
};

export type ApplicationModel = {
  __typename?: 'ApplicationModel';
  adult_content: Scalars['Boolean'];
  allow_images_and_videos_on_comments: Scalars['Boolean'];
  application_name: Scalars['String'];
  application_owner: UserModel;
  application_owner_id: Scalars['String'];
  auth_secret: Scalars['String'];
  authenticated_users: Array<UserModel>;
  authenticated_users_ids: Array<Scalars['String']>;
  banned_users_by_id: Array<Scalars['String']>;
  category: Category;
  comment_policy_summary?: Maybe<Scalars['String']>;
  comment_policy_url?: Maybe<Scalars['String']>;
  commenters_users_ids: Array<Scalars['String']>;
  comments: Array<CommentModel>;
  cost: Scalars['Float'];
  created_at: Scalars['DateTime'];
  default_avatar_url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  display_comments_when_flagged: Scalars['Boolean'];
  email_mods_when_comments_flagged: Scalars['Boolean'];
  id: Scalars['String'];
  language: Language;
  links_in_comments: Scalars['Boolean'];
  moderators: Array<UserModel>;
  moderators_ids: Array<Scalars['String']>;
  plan: Scalars['String'];
  pre_comment_moderation: Pre_Comment_Moderation;
  renewal?: Maybe<Scalars['DateTime']>;
  short_name: Scalars['String'];
  subscription: SubscriptionEntity;
  theme: Theme;
  thread_ids: Array<Scalars['String']>;
  threads: Array<ThreadModel>;
  updated_at: Scalars['DateTime'];
  website_url?: Maybe<Scalars['String']>;
};


export type ApplicationModelAuthenticated_UsersArgs = {
  authenticatedUserInput: AuthenticatedUserInput;
};

export type ApproveCommentsInput = {
  comment_ids: Array<Scalars['String']>;
};

export type AuthenticatedUserInput = {
  choice: Choice;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
};

export type AvatarEntity = {
  __typename?: 'AvatarEntity';
  ETag: Scalars['String'];
  created_at: Scalars['DateTime'];
  default_avatar: Scalars['Boolean'];
  encoding: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['String'];
  key: Scalars['String'];
  updated_at: Scalars['DateTime'];
  url: Scalars['String'];
};

export type BlockUserFromApplicationInput = {
  application_id: Scalars['String'];
  user_ids: Array<Scalars['String']>;
};

export enum Category {
  Tech = 'TECH'
}

export enum Choice {
  All = 'ALL',
  Blocked = 'BLOCKED',
  Removed = 'REMOVED'
}

export type CardDetailEntity = {
  __typename?: 'CardDetailEntity';
  authorised_at: Scalars['String'];
  avs_status: Scalars['String'];
  bin: Scalars['String'];
  captured_at: Scalars['String'];
  card_brand: Scalars['String'];
  card_type: Scalars['String'];
  cvv_status: Scalars['String'];
  entry_method: Scalars['String'];
  exp_month: Scalars['BigInt'];
  exp_year: Scalars['BigInt'];
  fingerprint: Scalars['String'];
  id: Scalars['String'];
  last_4: Scalars['String'];
  prepaid_type: Scalars['String'];
  statement_description: Scalars['String'];
  status: Scalars['String'];
};

export type ChangeCommentSettingsInput = {
  comment_id: Scalars['String'];
  reply_notification: Scalars['Boolean'];
};

export type ChangePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ChangeSubscriptionPlanInput = {
  plan: Scalars['String'];
};

export type ClosePollInput = {
  poll_id: Scalars['String'];
};

export type CommentModel = {
  __typename?: 'CommentModel';
  _count: CountModel;
  application_id: Scalars['String'];
  approved: Scalars['Boolean'];
  author: UserModel;
  created_at: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  down_vote: Array<RatingModel>;
  edited: Scalars['Boolean'];
  flagged: Scalars['Boolean'];
  id: Scalars['String'];
  json_body: Array<Scalars['JSONObject']>;
  parent_id?: Maybe<Scalars['String']>;
  pending: Scalars['Boolean'];
  plain_text_body: Scalars['String'];
  private_information: Scalars['Boolean'];
  replied_to_id?: Maybe<Scalars['String']>;
  replied_to_user?: Maybe<UserModel>;
  replies: Array<CommentModel>;
  reply_notification: Scalars['Boolean'];
  reports: Array<ReportModel>;
  thread_id: Scalars['String'];
  threatening_content: Scalars['Boolean'];
  up_vote: Array<RatingModel>;
  updated_at: Scalars['DateTime'];
  user_id: Scalars['String'];
};

export type CommentStatsEntity = {
  __typename?: 'CommentStatsEntity';
  comments_per_day: Array<CommentsPerDay>;
};

export type CommentsByUserIdInput = {
  user_id?: InputMaybe<Scalars['String']>;
};

export type CommentsPerDay = {
  __typename?: 'CommentsPerDay';
  count: Scalars['Int'];
  date: Scalars['DateTime'];
};

export type CountModel = {
  __typename?: 'CountModel';
  down_vote: Scalars['Int'];
  replies: Scalars['Int'];
  up_vote: Scalars['Int'];
};

export type CreateApplicationInput = {
  adult_content: Scalars['Boolean'];
  application_name: Scalars['String'];
  application_short_name: Scalars['String'];
  category: Category;
  comment_policy_summary?: InputMaybe<Scalars['String']>;
  comment_policy_url?: InputMaybe<Scalars['String']>;
  default_avatar_url?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  language: Language;
  theme: Theme;
  website_url?: InputMaybe<Scalars['String']>;
};

export type CreateCommentInput = {
  application_id: Scalars['String'];
  json_body: Scalars['JSONObject'];
  plain_text_body: Scalars['String'];
  thread_id: Scalars['String'];
};

export type CreateOrderInput = {
  currency: Scalars['String'];
  idempotency_key: Scalars['String'];
  source_id: Scalars['String'];
  /** Total cost */
  total_price: Scalars['Float'];
};

export type CreatePollInput = {
  options: Array<OptionInput>;
  thread_id: Scalars['String'];
  title: Scalars['String'];
};

export type CreateReplyCommentInput = {
  application_id: Scalars['String'];
  json_body: Scalars['JSONObject'];
  parent_id: Scalars['String'];
  plain_text_body: Scalars['String'];
  replied_to_id: Scalars['String'];
  thread_id: Scalars['String'];
};

export type CreateReportInput = {
  comment_id: Scalars['String'];
  report: Report_Reason;
};

export type DeleteManyCommentsInput = {
  comment_ids: Array<Scalars['String']>;
  permanent_delete: Scalars['Boolean'];
};

export type DeleteManyNotificationsInput = {
  notifications_ids: Array<Scalars['String']>;
};

export type DeleteNotificationInput = {
  id: Scalars['String'];
};

export type DeletePollInput = {
  poll_id: Scalars['String'];
  thread_id: Scalars['String'];
};

export type DeleteUserInput = {
  email: Scalars['String'];
};

export type FetchAllComments = {
  __typename?: 'FetchAllComments';
  comments: Array<CommentModel>;
  comments_count: Scalars['Int'];
};

export type FetchApplicationByShortNameInput = {
  application_short_name: Scalars['String'];
};

export type FetchCommentByApplicationName = {
  __typename?: 'FetchCommentByApplicationName';
  comments: Array<CommentModel>;
  comments_count: Scalars['Int'];
};

export type FetchCommentByThreadIdInput = {
  application_short_name: Scalars['String'];
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  sort: Sort;
  thread_id: Scalars['String'];
};

export type FetchCommentByThreadIdResponse = {
  __typename?: 'FetchCommentByThreadIdResponse';
  comments: Array<CommentModel>;
  comments_count: Scalars['Int'];
};

export type FetchCommentStatsInput = {
  end_date: Scalars['DateTime'];
  start_date: Scalars['DateTime'];
};

export type FetchCommentsByApplicationId = {
  __typename?: 'FetchCommentsByApplicationId';
  comments: Array<CommentModel>;
  comments_count: Scalars['Int'];
};

export type FetchCommentsByApplicationIdInput = {
  application_id: Scalars['String'];
  application_short_name: Scalars['String'];
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  sort?: InputMaybe<Sort>;
};

export type FetchCommentsByApplicationShortNameInput = {
  application_short_name: Scalars['String'];
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  sort?: InputMaybe<Sort>;
  where: Where;
};

export type FetchNotificationByApplicationIdInput = {
  application_id: Scalars['String'];
};

export type FetchNotificationByApplicationShortNameInput = {
  short_name: Scalars['String'];
};

export type FetchNotificationsByUserIdInput = {
  user_id: Scalars['String'];
};

export type FetchThreadCommentsBySort = {
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  sort?: InputMaybe<Sort>;
};

export type FetchThreadStats = {
  limit: Scalars['Int'];
  skip: Scalars['Int'];
};

export type FetchThreadsByUserIdInput = {
  user_id: Scalars['String'];
};

export type FindOrCreateOneThreadInput = {
  /** Application ID */
  application_id: Scalars['String'];
  /** Thread Title */
  title?: InputMaybe<Scalars['String']>;
  /** Thread website url */
  website_url: Scalars['String'];
};

export type FindProfileInput = {
  username: Scalars['String'];
};

export type FindThreadByIdInput = {
  thread_id: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
  redirect_url?: InputMaybe<Scalars['String']>;
};

export type IsUserSubscribedToThreadInput = {
  thread_id: Scalars['String'];
};

export enum Language {
  English = 'ENGLISH'
}

export type LoginInput = {
  application_short_name?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  message: Scalars['String'];
  refresh_token: Scalars['String'];
  success: Scalars['Boolean'];
  token: Scalars['String'];
  two_factor_authentication: Scalars['Boolean'];
  user: UserModel;
};

export type LoginResponseUnion = LoginResponse | TwoFactorLoginResponse;

export type Mutation = {
  __typename?: 'Mutation';
  add_application_moderator: ApplicationModel;
  add_pinned_comment: ThreadModel;
  add_user_to_shadow_ban: StandardResponseModel;
  add_user_to_threads_active_users: StandardResponseModel;
  approve_comments: StandardResponseModel;
  block_user: StandardResponseModel;
  block_users_from_application: ApplicationModel;
  cancel_order: StandardResponseModel;
  cancel_subscription_plan: ApplicationModel;
  change_comment_settings: CommentModel;
  change_password: StandardResponseModel;
  change_subscription_plan: ApplicationModel;
  close_poll: PollEntity;
  confirm_user: StandardResponseModel;
  create_application: ApplicationModel;
  create_comment: CommentModel;
  create_order: StandardResponseModel;
  create_poll: PollEntity;
  create_reply_comment: CommentModel;
  create_report: StandardResponseModel;
  delete_comment: StandardResponseModel;
  delete_many_comments: StandardResponseModel;
  delete_many_notifications: StandardResponse;
  delete_notification: StandardResponse;
  delete_poll: StandardResponseModel;
  delete_report_by_id: StandardResponseModel;
  delete_user: StandardResponseModel;
  down_vote_comment: CommentModel;
  forgot_password: StandardResponseModel;
  login_user: LoginResponseUnion;
  logout_user: StandardResponseModel;
  refund_order: StandardResponseModel;
  regenerate_new_auth_secret: ApplicationModel;
  register_user: StandardResponseModel;
  remove_application: StandardResponseModel;
  remove_application_moderator: ApplicationModel;
  remove_user_from_threads_active_users: StandardResponseModel;
  remove_users_from_shadow_ban: StandardResponseModel;
  toggle_subscription_to_thread: StandardResponseModel;
  two_factor_login: TwoFactorLoginSuccessResponse;
  unblock_user: StandardResponseModel;
  unblock_users_from_application: ApplicationModel;
  up_vote_comment: CommentModel;
  update_application: ApplicationModel;
  update_application_comment_rules: ApplicationModel;
  update_comment: CommentModel;
  update_poll_vote: PollEntity;
  update_user: UserModel;
  upgrade_subscription_plan: StandardResponseModel;
};


export type MutationAdd_Application_ModeratorArgs = {
  addModeratorInput: AddModeratorInput;
};


export type MutationAdd_Pinned_CommentArgs = {
  addPinnedCommentInput: AddPinnedCommentInput;
};


export type MutationAdd_User_To_Shadow_BanArgs = {
  addUserToShadowBan: ShadowBanUserByIdInput;
};


export type MutationAdd_User_To_Threads_Active_UsersArgs = {
  addUserToActiveUsersInput: AddUserToActiveUsersInput;
};


export type MutationApprove_CommentsArgs = {
  approveCommentsInput: ApproveCommentsInput;
};


export type MutationBlock_UserArgs = {
  user_id: Scalars['String'];
};


export type MutationBlock_Users_From_ApplicationArgs = {
  blockUsersFromApplication: BlockUserFromApplicationInput;
};


export type MutationCancel_OrderArgs = {
  idempotency_key: Scalars['String'];
};


export type MutationChange_Comment_SettingsArgs = {
  changeCommentSettingsInput: ChangeCommentSettingsInput;
};


export type MutationChange_PasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};


export type MutationChange_Subscription_PlanArgs = {
  changeSubscriptionPlan: ChangeSubscriptionPlanInput;
};


export type MutationClose_PollArgs = {
  closePollInput: ClosePollInput;
};


export type MutationConfirm_UserArgs = {
  token: Scalars['String'];
};


export type MutationCreate_ApplicationArgs = {
  createApplicationInput: CreateApplicationInput;
};


export type MutationCreate_CommentArgs = {
  CreateCommentInput: CreateCommentInput;
};


export type MutationCreate_OrderArgs = {
  CreateOrderInput: CreateOrderInput;
};


export type MutationCreate_PollArgs = {
  createPollInput: CreatePollInput;
};


export type MutationCreate_Reply_CommentArgs = {
  CreateReplyCommentInput: CreateReplyCommentInput;
};


export type MutationCreate_ReportArgs = {
  createReportInput: CreateReportInput;
};


export type MutationDelete_CommentArgs = {
  commentId: Scalars['String'];
};


export type MutationDelete_Many_CommentsArgs = {
  deleteManyCommentsInput: DeleteManyCommentsInput;
};


export type MutationDelete_Many_NotificationsArgs = {
  deleteManyNotifications: DeleteManyNotificationsInput;
};


export type MutationDelete_NotificationArgs = {
  deleteNotification: DeleteNotificationInput;
};


export type MutationDelete_PollArgs = {
  deletePollInput: DeletePollInput;
};


export type MutationDelete_Report_By_IdArgs = {
  id: Scalars['String'];
};


export type MutationDelete_UserArgs = {
  deleteUserInput: DeleteUserInput;
};


export type MutationDown_Vote_CommentArgs = {
  comment_id: Scalars['String'];
};


export type MutationForgot_PasswordArgs = {
  forgotPasswordInput: ForgotPasswordInput;
};


export type MutationLogin_UserArgs = {
  loginInput: LoginInput;
};


export type MutationRefund_OrderArgs = {
  refundOrderInput: RefundOrderInput;
};


export type MutationRegenerate_New_Auth_SecretArgs = {
  application_id: Scalars['String'];
};


export type MutationRegister_UserArgs = {
  registrationInput: RegistrationInput;
};


export type MutationRemove_ApplicationArgs = {
  removeApplicationInput: RemoveApplicationInput;
};


export type MutationRemove_Application_ModeratorArgs = {
  removeModeratorInput: RemoveModeratorInput;
};


export type MutationRemove_User_From_Threads_Active_UsersArgs = {
  removeUserFromThreadsActiveUsersInput: RemoveUserFromThreadsActiveUsersInput;
};


export type MutationRemove_Users_From_Shadow_BanArgs = {
  removeUserToShadowBan: ShadowBanUserByIdInput;
};


export type MutationToggle_Subscription_To_ThreadArgs = {
  toggleSubscriptionToThreadInput: ToggleSubscriptionToThreadInput;
};


export type MutationTwo_Factor_LoginArgs = {
  twoFactorInput: TwoFactorInput;
};


export type MutationUnblock_UserArgs = {
  user_id: Scalars['String'];
};


export type MutationUnblock_Users_From_ApplicationArgs = {
  unBlockUsersFromApplication: UnBlockUserFromApplicationInput;
};


export type MutationUp_Vote_CommentArgs = {
  comment_id: Scalars['String'];
};


export type MutationUpdate_ApplicationArgs = {
  updateApplicationInput: UpdateApplicationInput;
};


export type MutationUpdate_Application_Comment_RulesArgs = {
  updateApplicationCommentRulesInput: UpdateApplicationCommentRulesInput;
};


export type MutationUpdate_CommentArgs = {
  UpdateCommentInput: UpdateCommentInput;
};


export type MutationUpdate_Poll_VoteArgs = {
  updatePollVoteInput: UpdatePollVoteInput;
};


export type MutationUpdate_UserArgs = {
  updateUserInput: UpdateUserInput;
};

export type NotificationEntity = {
  __typename?: 'NotificationEntity';
  application_id?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id: Scalars['String'];
  message: Scalars['String'];
  updated_at: Scalars['DateTime'];
  url: Scalars['String'];
};

export type OptionEntity = {
  __typename?: 'OptionEntity';
  id: Scalars['String'];
  option: Scalars['String'];
  votes: Array<VoteEntity>;
};

export type OptionInput = {
  option: Scalars['String'];
};

export type OrderEntity = {
  __typename?: 'OrderEntity';
  confirmed: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  customer: UserModel;
  customer_id: Scalars['String'];
  id: Scalars['String'];
  payment: PaymentEntity;
  total_price: Scalars['BigInt'];
  updated_at: Scalars['DateTime'];
};

export enum Pre_Comment_Moderation {
  All = 'ALL',
  NewComments = 'NEW_COMMENTS',
  None = 'NONE'
}

export type PaymentEntity = {
  __typename?: 'PaymentEntity';
  application_details: Scalars['String'];
  approved_mount: Scalars['BigInt'];
  cardDetailsId: Scalars['String'];
  card_details: CardDetailEntity;
  created_at: Scalars['DateTime'];
  currency: Scalars['String'];
  customer_id: Scalars['String'];
  delay_action: Scalars['String'];
  delay_duration: Scalars['String'];
  delayed_until: Scalars['String'];
  id: Scalars['String'];
  location_id: Scalars['String'];
  receipt_number: Scalars['String'];
  receipt_url: Scalars['String'];
  risk_level: Scalars['String'];
  source_type: Scalars['String'];
  square_product: Scalars['String'];
  status: Scalars['String'];
  total_mount: Scalars['BigInt'];
  updated_at: Scalars['DateTime'];
  version_token: Scalars['String'];
};

export type PollEntity = {
  __typename?: 'PollEntity';
  closed: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  id: Scalars['String'];
  options: Array<OptionEntity>;
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
  voted: Array<Scalars['String']>;
};

export type ProfileEntity = {
  __typename?: 'ProfileEntity';
  id: Scalars['String'];
  profile_comments: Array<CommentModel>;
  user: UserModel;
};

export type Query = {
  __typename?: 'Query';
  current_user: UserModel;
  fetch_all_applications: Array<ApplicationModel>;
  fetch_all_orders: Array<OrderEntity>;
  fetch_all_reports: Array<ReportModel>;
  fetch_all_threads: Array<ThreadModel>;
  fetch_application_by_short_name: ApplicationModel;
  fetch_applications_by_owner_id: Array<ApplicationModel>;
  fetch_comment_stats: CommentStatsEntity;
  fetch_comments: FetchAllComments;
  fetch_comments_by_application_id: FetchCommentsByApplicationId;
  fetch_comments_by_application_short_name: FetchCommentByApplicationName;
  fetch_comments_by_thread_id: FetchCommentByThreadIdResponse;
  fetch_notifications: Array<NotificationEntity>;
  fetch_notifications_by_application_id: Array<NotificationEntity>;
  fetch_notifications_by_short_name: Array<NotificationEntity>;
  fetch_notifications_by_user_id: Array<NotificationEntity>;
  fetch_threads_by_user_id: Array<ThreadModel>;
  fetch_users: Array<UserModel>;
  find_one_application_by_id: ApplicationModel;
  find_one_application_by_name: ApplicationModel;
  find_one_thread_or_create_one: ThreadModel;
  find_profile: ProfileEntity;
  find_thread_by_id: ThreadModel;
  is_user_subscribed_to_thread: StandardResponseModel;
  resend_email_code: StandardResponseModel;
  search_user_by_email: UserModel;
};


export type QueryFetch_Application_By_Short_NameArgs = {
  fetchApplicationByShortNameInput: FetchApplicationByShortNameInput;
};


export type QueryFetch_Comment_StatsArgs = {
  fetchCommentStatsInput: FetchCommentStatsInput;
};


export type QueryFetch_Comments_By_Application_IdArgs = {
  fetchCommentsByApplicationId: FetchCommentsByApplicationIdInput;
};


export type QueryFetch_Comments_By_Application_Short_NameArgs = {
  fetchCommentsByApplicationShortNameInput: FetchCommentsByApplicationShortNameInput;
};


export type QueryFetch_Comments_By_Thread_IdArgs = {
  fetchCommentByThreadIdInput: FetchCommentByThreadIdInput;
};


export type QueryFetch_Notifications_By_Application_IdArgs = {
  fetchNotificationsByApplicationIdInput: FetchNotificationByApplicationIdInput;
};


export type QueryFetch_Notifications_By_Short_NameArgs = {
  fetchNotificationByApplicationShortNameInput: FetchNotificationByApplicationShortNameInput;
};


export type QueryFetch_Notifications_By_User_IdArgs = {
  fetchNotificationsByUserIdInput: FetchNotificationsByUserIdInput;
};


export type QueryFetch_Threads_By_User_IdArgs = {
  fetchThreadsByUserIdInput: FetchThreadsByUserIdInput;
};


export type QueryFind_One_Application_By_IdArgs = {
  id: Scalars['String'];
};


export type QueryFind_One_Application_By_NameArgs = {
  name: Scalars['String'];
};


export type QueryFind_One_Thread_Or_Create_OneArgs = {
  findOrCreateOneThreadInput: FindOrCreateOneThreadInput;
};


export type QueryFind_ProfileArgs = {
  findProfileInput: FindProfileInput;
};


export type QueryFind_Thread_By_IdArgs = {
  findThreadById: FindThreadByIdInput;
};


export type QueryIs_User_Subscribed_To_ThreadArgs = {
  isUserSubscribedToThreadInput: IsUserSubscribedToThreadInput;
};


export type QueryResend_Email_CodeArgs = {
  resendEmailCodeInput: ResendEmailCodeInput;
};


export type QuerySearch_User_By_EmailArgs = {
  email: Scalars['String'];
};

export enum Report_Reason {
  Disagree = 'DISAGREE',
  InappropriateProfile = 'INAPPROPRIATE_PROFILE',
  PrivateInformation = 'PRIVATE_INFORMATION',
  Spam = 'SPAM',
  ThreateningContent = 'THREATENING_CONTENT'
}

export type RatingModel = {
  __typename?: 'RatingModel';
  author_id: Scalars['String'];
  id: Scalars['String'];
};

export type RefundOrderInput = {
  amount_money: Scalars['BigInt'];
  currency: Scalars['String'];
  idempotency_key: Scalars['String'];
  payment_id: Scalars['String'];
  reason: Scalars['String'];
};

export type RegistrationInput = {
  application_id?: InputMaybe<Scalars['String']>;
  application_short_name?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  redirect_url?: InputMaybe<Scalars['String']>;
  two_factor_authentication?: InputMaybe<Scalars['Boolean']>;
  username: Scalars['String'];
};

export type RemoveApplicationInput = {
  application_id: Scalars['String'];
};

export type RemoveModeratorInput = {
  application_id: Scalars['String'];
  moderator_id: Scalars['String'];
};

export type RemoveUserFromThreadsActiveUsersInput = {
  thread_id: Scalars['String'];
};

export type ReportModel = {
  __typename?: 'ReportModel';
  created_at: Scalars['DateTime'];
  id: Scalars['String'];
  reason: Report_Reason;
  updated_at: Scalars['DateTime'];
  user_id: Scalars['String'];
};

export type ResendEmailCodeInput = {
  email: Scalars['String'];
  redirect_url: Scalars['String'];
};

export enum Status {
  Away = 'AWAY',
  Invisble = 'INVISBLE',
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type ShadowBanUserByIdInput = {
  application_short_name: Scalars['String'];
  user_id: Scalars['String'];
};

export type StandardResponse = {
  __typename?: 'StandardResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type StandardResponseModel = {
  __typename?: 'StandardResponseModel';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type SubscriptionEntity = {
  __typename?: 'SubscriptionEntity';
  created_at: Scalars['DateTime'];
  id: Scalars['String'];
  idempotency_key: Scalars['String'];
  order_id: Scalars['String'];
  renewal: Scalars['Boolean'];
  renewal_date: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
};

export enum Theme {
  Auto = 'AUTO',
  Dark = 'DARK',
  Light = 'LIGHT'
}

export type ThreadModel = {
  __typename?: 'ThreadModel';
  application_id: Scalars['String'];
  commenters_ids: Array<Scalars['String']>;
  /** UUID for Thread */
  id: Scalars['String'];
  parent_application: ApplicationModel;
  pinned_comment?: Maybe<CommentModel>;
  pinned_comment_id?: Maybe<Scalars['String']>;
  poll?: Maybe<PollEntity>;
  subscribed_users: Array<UserModel>;
  subscribed_users_ids: Array<Scalars['String']>;
  thread_comments: FetchCommentByThreadIdResponse;
  thread_stats: ViewEntity;
  title: Scalars['String'];
  website_url: Scalars['String'];
};


export type ThreadModelThread_CommentsArgs = {
  commentsByUserIdInput?: InputMaybe<CommentsByUserIdInput>;
  fetchThreadCommentsBySort: FetchThreadCommentsBySort;
};


export type ThreadModelThread_StatsArgs = {
  fetchThreadStats: FetchThreadStats;
};

export type ToggleSubscriptionToThreadInput = {
  thread_id: Scalars['String'];
};

export type TwoFactorInput = {
  email: Scalars['String'];
  two_factor_id: Scalars['String'];
};

export type TwoFactorLoginResponse = {
  __typename?: 'TwoFactorLoginResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
  two_factor_authentication: Scalars['Boolean'];
};

export type TwoFactorLoginSuccessResponse = {
  __typename?: 'TwoFactorLoginSuccessResponse';
  message: Scalars['String'];
  refresh_token: Scalars['String'];
  success: Scalars['Boolean'];
  token: Scalars['String'];
  two_factor_authentication: Scalars['Boolean'];
  user: UserModel;
};

export enum User_Role {
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  Owner = 'OWNER',
  SuperAdmin = 'SUPER_ADMIN',
  User = 'USER'
}

export type UnBlockUserFromApplicationInput = {
  application_id: Scalars['String'];
  user_ids: Array<Scalars['String']>;
};

export type UpdateApplicationCommentRulesInput = {
  allow_images_and_videos_on_comments: Scalars['Boolean'];
  application_short_name: Scalars['String'];
  display_comments_when_flagged: Scalars['Boolean'];
  email_mods_when_comments_flagged: Scalars['Boolean'];
  links_in_comments: Scalars['Boolean'];
  pre_comment_moderation: Pre_Comment_Moderation;
};

export type UpdateApplicationInput = {
  adult_content: Scalars['Boolean'];
  application_short_name: Scalars['String'];
  category: Category;
  comment_policy_summary?: InputMaybe<Scalars['String']>;
  comment_policy_url?: InputMaybe<Scalars['String']>;
  default_avatar_url?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  language: Language;
  theme: Theme;
  website_url?: InputMaybe<Scalars['String']>;
};

export type UpdateCommentInput = {
  comment_id: Scalars['String'];
  json_body: Scalars['JSONObject'];
  plain_text_body: Scalars['String'];
};

export type UpdatePollVoteInput = {
  options_id: Scalars['String'];
  poll_id: Scalars['String'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  two_factor_authentication?: InputMaybe<Scalars['Boolean']>;
  user_role?: InputMaybe<User_Role>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserModel = {
  __typename?: 'UserModel';
  applications_joined_ids: Array<Scalars['String']>;
  avatar: AvatarEntity;
  blocked_users: Array<UserModel>;
  confirmed: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  last_active: Scalars['DateTime'];
  status: Status;
  two_factor_authentication: Scalars['Boolean'];
  updated_at: Scalars['DateTime'];
  user_role: User_Role;
  username: Scalars['String'];
};

export type ViewEntity = {
  __typename?: 'ViewEntity';
  created_at: Scalars['DateTime'];
  id: Scalars['String'];
  updated_at: Scalars['DateTime'];
  user_id: Scalars['String'];
  view_count: Scalars['Int'];
};

export type VoteEntity = {
  __typename?: 'VoteEntity';
  created_at: Scalars['DateTime'];
  id: Scalars['String'];
  updated_at: Scalars['DateTime'];
  user_id: Scalars['String'];
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC',
  TopVotes = 'TOP_VOTES'
}

export enum Where {
  All = 'ALL',
  Appoved = 'APPOVED',
  Deleted = 'DELETED',
  Pending = 'PENDING',
  Spam = 'SPAM'
}

export type RegistrationMutationVariables = Exact<{
  registrationInput: RegistrationInput;
}>;


export type RegistrationMutation = { __typename?: 'Mutation', register_user: { __typename?: 'StandardResponseModel', success: boolean, message: string } };

export type LoginResponseFragmentFragment = { __typename?: 'LoginResponse', success: boolean, message: string, token: string, refresh_token: string, two_factor_authentication: boolean, user: { __typename?: 'UserModel', username: string, id: string } };

export type TwoFactorLoginResponseFragmentFragment = { __typename?: 'TwoFactorLoginResponse', success: boolean, message: string, two_factor_authentication: boolean };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login_user: { __typename?: 'LoginResponse', success: boolean, message: string, token: string, refresh_token: string, two_factor_authentication: boolean, user: { __typename?: 'UserModel', username: string, id: string } } | { __typename?: 'TwoFactorLoginResponse', success: boolean, message: string, two_factor_authentication: boolean } };

export type ForgotPasswordMutationVariables = Exact<{
  forgotPasswordInput: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgot_password: { __typename?: 'StandardResponseModel', success: boolean, message: string } };

export type TwoFactorLoginMutationVariables = Exact<{
  twoFactorInput: TwoFactorInput;
}>;


export type TwoFactorLoginMutation = { __typename?: 'Mutation', two_factor_login: { __typename?: 'TwoFactorLoginSuccessResponse', success: boolean, message: string, token: string, refresh_token: string, two_factor_authentication: boolean, user: { __typename?: 'UserModel', username: string, id: string } } };

export type DeleteUserMutationVariables = Exact<{
  deleteUserInput: DeleteUserInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', delete_user: { __typename?: 'StandardResponseModel', success: boolean, message: string } };

export type ChangePasswordMutationVariables = Exact<{
  changePasswordInput: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', change_password: { __typename?: 'StandardResponseModel', success: boolean, message: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', current_user: { __typename?: 'UserModel', id: string, username: string } };

export const LoginResponseFragmentFragmentDoc = gql`
    fragment LoginResponseFragment on LoginResponse {
  success
  message
  token
  refresh_token
  two_factor_authentication
  user {
    username
    id
  }
}
    `;
export const TwoFactorLoginResponseFragmentFragmentDoc = gql`
    fragment TwoFactorLoginResponseFragment on TwoFactorLoginResponse {
  success
  message
  two_factor_authentication
}
    `;
export const RegistrationDocument = gql`
    mutation Registration($registrationInput: RegistrationInput!) {
  register_user(registrationInput: $registrationInput) {
    success
    message
  }
}
    `;
export type RegistrationMutationFn = Apollo.MutationFunction<RegistrationMutation, RegistrationMutationVariables>;

/**
 * __useRegistrationMutation__
 *
 * To run a mutation, you first call `useRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registrationMutation, { data, loading, error }] = useRegistrationMutation({
 *   variables: {
 *      registrationInput: // value for 'registrationInput'
 *   },
 * });
 */
export function useRegistrationMutation(baseOptions?: Apollo.MutationHookOptions<RegistrationMutation, RegistrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegistrationMutation, RegistrationMutationVariables>(RegistrationDocument, options);
      }
export type RegistrationMutationHookResult = ReturnType<typeof useRegistrationMutation>;
export type RegistrationMutationResult = Apollo.MutationResult<RegistrationMutation>;
export type RegistrationMutationOptions = Apollo.BaseMutationOptions<RegistrationMutation, RegistrationMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login_user(loginInput: $loginInput) {
    ... on LoginResponse {
      ...LoginResponseFragment
    }
    ... on TwoFactorLoginResponse {
      ...TwoFactorLoginResponseFragment
    }
  }
}
    ${LoginResponseFragmentFragmentDoc}
${TwoFactorLoginResponseFragmentFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
  forgot_password(forgotPasswordInput: $forgotPasswordInput) {
    success
    message
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      forgotPasswordInput: // value for 'forgotPasswordInput'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const TwoFactorLoginDocument = gql`
    mutation TwoFactorLogin($twoFactorInput: TwoFactorInput!) {
  two_factor_login(twoFactorInput: $twoFactorInput) {
    success
    message
    token
    refresh_token
    two_factor_authentication
    user {
      username
      id
    }
  }
}
    `;
export type TwoFactorLoginMutationFn = Apollo.MutationFunction<TwoFactorLoginMutation, TwoFactorLoginMutationVariables>;

/**
 * __useTwoFactorLoginMutation__
 *
 * To run a mutation, you first call `useTwoFactorLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTwoFactorLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [twoFactorLoginMutation, { data, loading, error }] = useTwoFactorLoginMutation({
 *   variables: {
 *      twoFactorInput: // value for 'twoFactorInput'
 *   },
 * });
 */
export function useTwoFactorLoginMutation(baseOptions?: Apollo.MutationHookOptions<TwoFactorLoginMutation, TwoFactorLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TwoFactorLoginMutation, TwoFactorLoginMutationVariables>(TwoFactorLoginDocument, options);
      }
export type TwoFactorLoginMutationHookResult = ReturnType<typeof useTwoFactorLoginMutation>;
export type TwoFactorLoginMutationResult = Apollo.MutationResult<TwoFactorLoginMutation>;
export type TwoFactorLoginMutationOptions = Apollo.BaseMutationOptions<TwoFactorLoginMutation, TwoFactorLoginMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($deleteUserInput: DeleteUserInput!) {
  delete_user(deleteUserInput: $deleteUserInput) {
    success
    message
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      deleteUserInput: // value for 'deleteUserInput'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($changePasswordInput: ChangePasswordInput!) {
  change_password(changePasswordInput: $changePasswordInput) {
    success
    message
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      changePasswordInput: // value for 'changePasswordInput'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  current_user {
    id
    username
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export type ApplicationModelKeySpecifier = ('adult_content' | 'allow_images_and_videos_on_comments' | 'application_name' | 'application_owner' | 'application_owner_id' | 'auth_secret' | 'authenticated_users' | 'authenticated_users_ids' | 'banned_users_by_id' | 'category' | 'comment_policy_summary' | 'comment_policy_url' | 'commenters_users_ids' | 'comments' | 'cost' | 'created_at' | 'default_avatar_url' | 'description' | 'display_comments_when_flagged' | 'email_mods_when_comments_flagged' | 'id' | 'language' | 'links_in_comments' | 'moderators' | 'moderators_ids' | 'plan' | 'pre_comment_moderation' | 'renewal' | 'short_name' | 'subscription' | 'theme' | 'thread_ids' | 'threads' | 'updated_at' | 'website_url' | ApplicationModelKeySpecifier)[];
export type ApplicationModelFieldPolicy = {
	adult_content?: FieldPolicy<any> | FieldReadFunction<any>,
	allow_images_and_videos_on_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	application_name?: FieldPolicy<any> | FieldReadFunction<any>,
	application_owner?: FieldPolicy<any> | FieldReadFunction<any>,
	application_owner_id?: FieldPolicy<any> | FieldReadFunction<any>,
	auth_secret?: FieldPolicy<any> | FieldReadFunction<any>,
	authenticated_users?: FieldPolicy<any> | FieldReadFunction<any>,
	authenticated_users_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	banned_users_by_id?: FieldPolicy<any> | FieldReadFunction<any>,
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	comment_policy_summary?: FieldPolicy<any> | FieldReadFunction<any>,
	comment_policy_url?: FieldPolicy<any> | FieldReadFunction<any>,
	commenters_users_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	cost?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	default_avatar_url?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	display_comments_when_flagged?: FieldPolicy<any> | FieldReadFunction<any>,
	email_mods_when_comments_flagged?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	language?: FieldPolicy<any> | FieldReadFunction<any>,
	links_in_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	moderators?: FieldPolicy<any> | FieldReadFunction<any>,
	moderators_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	plan?: FieldPolicy<any> | FieldReadFunction<any>,
	pre_comment_moderation?: FieldPolicy<any> | FieldReadFunction<any>,
	renewal?: FieldPolicy<any> | FieldReadFunction<any>,
	short_name?: FieldPolicy<any> | FieldReadFunction<any>,
	subscription?: FieldPolicy<any> | FieldReadFunction<any>,
	theme?: FieldPolicy<any> | FieldReadFunction<any>,
	thread_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	threads?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	website_url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AvatarEntityKeySpecifier = ('ETag' | 'created_at' | 'default_avatar' | 'encoding' | 'filename' | 'id' | 'key' | 'updated_at' | 'url' | AvatarEntityKeySpecifier)[];
export type AvatarEntityFieldPolicy = {
	ETag?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	default_avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	encoding?: FieldPolicy<any> | FieldReadFunction<any>,
	filename?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CardDetailEntityKeySpecifier = ('authorised_at' | 'avs_status' | 'bin' | 'captured_at' | 'card_brand' | 'card_type' | 'cvv_status' | 'entry_method' | 'exp_month' | 'exp_year' | 'fingerprint' | 'id' | 'last_4' | 'prepaid_type' | 'statement_description' | 'status' | CardDetailEntityKeySpecifier)[];
export type CardDetailEntityFieldPolicy = {
	authorised_at?: FieldPolicy<any> | FieldReadFunction<any>,
	avs_status?: FieldPolicy<any> | FieldReadFunction<any>,
	bin?: FieldPolicy<any> | FieldReadFunction<any>,
	captured_at?: FieldPolicy<any> | FieldReadFunction<any>,
	card_brand?: FieldPolicy<any> | FieldReadFunction<any>,
	card_type?: FieldPolicy<any> | FieldReadFunction<any>,
	cvv_status?: FieldPolicy<any> | FieldReadFunction<any>,
	entry_method?: FieldPolicy<any> | FieldReadFunction<any>,
	exp_month?: FieldPolicy<any> | FieldReadFunction<any>,
	exp_year?: FieldPolicy<any> | FieldReadFunction<any>,
	fingerprint?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	last_4?: FieldPolicy<any> | FieldReadFunction<any>,
	prepaid_type?: FieldPolicy<any> | FieldReadFunction<any>,
	statement_description?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommentModelKeySpecifier = ('_count' | 'application_id' | 'approved' | 'author' | 'created_at' | 'deleted' | 'down_vote' | 'edited' | 'flagged' | 'id' | 'json_body' | 'parent_id' | 'pending' | 'plain_text_body' | 'private_information' | 'replied_to_id' | 'replied_to_user' | 'replies' | 'reply_notification' | 'reports' | 'thread_id' | 'threatening_content' | 'up_vote' | 'updated_at' | 'user_id' | CommentModelKeySpecifier)[];
export type CommentModelFieldPolicy = {
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	application_id?: FieldPolicy<any> | FieldReadFunction<any>,
	approved?: FieldPolicy<any> | FieldReadFunction<any>,
	author?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	deleted?: FieldPolicy<any> | FieldReadFunction<any>,
	down_vote?: FieldPolicy<any> | FieldReadFunction<any>,
	edited?: FieldPolicy<any> | FieldReadFunction<any>,
	flagged?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	json_body?: FieldPolicy<any> | FieldReadFunction<any>,
	parent_id?: FieldPolicy<any> | FieldReadFunction<any>,
	pending?: FieldPolicy<any> | FieldReadFunction<any>,
	plain_text_body?: FieldPolicy<any> | FieldReadFunction<any>,
	private_information?: FieldPolicy<any> | FieldReadFunction<any>,
	replied_to_id?: FieldPolicy<any> | FieldReadFunction<any>,
	replied_to_user?: FieldPolicy<any> | FieldReadFunction<any>,
	replies?: FieldPolicy<any> | FieldReadFunction<any>,
	reply_notification?: FieldPolicy<any> | FieldReadFunction<any>,
	reports?: FieldPolicy<any> | FieldReadFunction<any>,
	thread_id?: FieldPolicy<any> | FieldReadFunction<any>,
	threatening_content?: FieldPolicy<any> | FieldReadFunction<any>,
	up_vote?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommentStatsEntityKeySpecifier = ('comments_per_day' | CommentStatsEntityKeySpecifier)[];
export type CommentStatsEntityFieldPolicy = {
	comments_per_day?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommentsPerDayKeySpecifier = ('count' | 'date' | CommentsPerDayKeySpecifier)[];
export type CommentsPerDayFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CountModelKeySpecifier = ('down_vote' | 'replies' | 'up_vote' | CountModelKeySpecifier)[];
export type CountModelFieldPolicy = {
	down_vote?: FieldPolicy<any> | FieldReadFunction<any>,
	replies?: FieldPolicy<any> | FieldReadFunction<any>,
	up_vote?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FetchAllCommentsKeySpecifier = ('comments' | 'comments_count' | FetchAllCommentsKeySpecifier)[];
export type FetchAllCommentsFieldPolicy = {
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	comments_count?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FetchCommentByApplicationNameKeySpecifier = ('comments' | 'comments_count' | FetchCommentByApplicationNameKeySpecifier)[];
export type FetchCommentByApplicationNameFieldPolicy = {
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	comments_count?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FetchCommentByThreadIdResponseKeySpecifier = ('comments' | 'comments_count' | FetchCommentByThreadIdResponseKeySpecifier)[];
export type FetchCommentByThreadIdResponseFieldPolicy = {
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	comments_count?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FetchCommentsByApplicationIdKeySpecifier = ('comments' | 'comments_count' | FetchCommentsByApplicationIdKeySpecifier)[];
export type FetchCommentsByApplicationIdFieldPolicy = {
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	comments_count?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoginResponseKeySpecifier = ('message' | 'refresh_token' | 'success' | 'token' | 'two_factor_authentication' | 'user' | LoginResponseKeySpecifier)[];
export type LoginResponseFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	refresh_token?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	two_factor_authentication?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('add_application_moderator' | 'add_pinned_comment' | 'add_user_to_shadow_ban' | 'add_user_to_threads_active_users' | 'approve_comments' | 'block_user' | 'block_users_from_application' | 'cancel_order' | 'cancel_subscription_plan' | 'change_comment_settings' | 'change_password' | 'change_subscription_plan' | 'close_poll' | 'confirm_user' | 'create_application' | 'create_comment' | 'create_order' | 'create_poll' | 'create_reply_comment' | 'create_report' | 'delete_comment' | 'delete_many_comments' | 'delete_many_notifications' | 'delete_notification' | 'delete_poll' | 'delete_report_by_id' | 'delete_user' | 'down_vote_comment' | 'forgot_password' | 'login_user' | 'logout_user' | 'refund_order' | 'regenerate_new_auth_secret' | 'register_user' | 'remove_application' | 'remove_application_moderator' | 'remove_user_from_threads_active_users' | 'remove_users_from_shadow_ban' | 'toggle_subscription_to_thread' | 'two_factor_login' | 'unblock_user' | 'unblock_users_from_application' | 'up_vote_comment' | 'update_application' | 'update_application_comment_rules' | 'update_comment' | 'update_poll_vote' | 'update_user' | 'upgrade_subscription_plan' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	add_application_moderator?: FieldPolicy<any> | FieldReadFunction<any>,
	add_pinned_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	add_user_to_shadow_ban?: FieldPolicy<any> | FieldReadFunction<any>,
	add_user_to_threads_active_users?: FieldPolicy<any> | FieldReadFunction<any>,
	approve_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	block_user?: FieldPolicy<any> | FieldReadFunction<any>,
	block_users_from_application?: FieldPolicy<any> | FieldReadFunction<any>,
	cancel_order?: FieldPolicy<any> | FieldReadFunction<any>,
	cancel_subscription_plan?: FieldPolicy<any> | FieldReadFunction<any>,
	change_comment_settings?: FieldPolicy<any> | FieldReadFunction<any>,
	change_password?: FieldPolicy<any> | FieldReadFunction<any>,
	change_subscription_plan?: FieldPolicy<any> | FieldReadFunction<any>,
	close_poll?: FieldPolicy<any> | FieldReadFunction<any>,
	confirm_user?: FieldPolicy<any> | FieldReadFunction<any>,
	create_application?: FieldPolicy<any> | FieldReadFunction<any>,
	create_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	create_order?: FieldPolicy<any> | FieldReadFunction<any>,
	create_poll?: FieldPolicy<any> | FieldReadFunction<any>,
	create_reply_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	create_report?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_many_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_many_notifications?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_notification?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_poll?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_report_by_id?: FieldPolicy<any> | FieldReadFunction<any>,
	delete_user?: FieldPolicy<any> | FieldReadFunction<any>,
	down_vote_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	forgot_password?: FieldPolicy<any> | FieldReadFunction<any>,
	login_user?: FieldPolicy<any> | FieldReadFunction<any>,
	logout_user?: FieldPolicy<any> | FieldReadFunction<any>,
	refund_order?: FieldPolicy<any> | FieldReadFunction<any>,
	regenerate_new_auth_secret?: FieldPolicy<any> | FieldReadFunction<any>,
	register_user?: FieldPolicy<any> | FieldReadFunction<any>,
	remove_application?: FieldPolicy<any> | FieldReadFunction<any>,
	remove_application_moderator?: FieldPolicy<any> | FieldReadFunction<any>,
	remove_user_from_threads_active_users?: FieldPolicy<any> | FieldReadFunction<any>,
	remove_users_from_shadow_ban?: FieldPolicy<any> | FieldReadFunction<any>,
	toggle_subscription_to_thread?: FieldPolicy<any> | FieldReadFunction<any>,
	two_factor_login?: FieldPolicy<any> | FieldReadFunction<any>,
	unblock_user?: FieldPolicy<any> | FieldReadFunction<any>,
	unblock_users_from_application?: FieldPolicy<any> | FieldReadFunction<any>,
	up_vote_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	update_application?: FieldPolicy<any> | FieldReadFunction<any>,
	update_application_comment_rules?: FieldPolicy<any> | FieldReadFunction<any>,
	update_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	update_poll_vote?: FieldPolicy<any> | FieldReadFunction<any>,
	update_user?: FieldPolicy<any> | FieldReadFunction<any>,
	upgrade_subscription_plan?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationEntityKeySpecifier = ('application_id' | 'created_at' | 'id' | 'message' | 'updated_at' | 'url' | NotificationEntityKeySpecifier)[];
export type NotificationEntityFieldPolicy = {
	application_id?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OptionEntityKeySpecifier = ('id' | 'option' | 'votes' | OptionEntityKeySpecifier)[];
export type OptionEntityFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	option?: FieldPolicy<any> | FieldReadFunction<any>,
	votes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderEntityKeySpecifier = ('confirmed' | 'created_at' | 'customer' | 'customer_id' | 'id' | 'payment' | 'total_price' | 'updated_at' | OrderEntityKeySpecifier)[];
export type OrderEntityFieldPolicy = {
	confirmed?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	customer?: FieldPolicy<any> | FieldReadFunction<any>,
	customer_id?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	payment?: FieldPolicy<any> | FieldReadFunction<any>,
	total_price?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentEntityKeySpecifier = ('application_details' | 'approved_mount' | 'cardDetailsId' | 'card_details' | 'created_at' | 'currency' | 'customer_id' | 'delay_action' | 'delay_duration' | 'delayed_until' | 'id' | 'location_id' | 'receipt_number' | 'receipt_url' | 'risk_level' | 'source_type' | 'square_product' | 'status' | 'total_mount' | 'updated_at' | 'version_token' | PaymentEntityKeySpecifier)[];
export type PaymentEntityFieldPolicy = {
	application_details?: FieldPolicy<any> | FieldReadFunction<any>,
	approved_mount?: FieldPolicy<any> | FieldReadFunction<any>,
	cardDetailsId?: FieldPolicy<any> | FieldReadFunction<any>,
	card_details?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	customer_id?: FieldPolicy<any> | FieldReadFunction<any>,
	delay_action?: FieldPolicy<any> | FieldReadFunction<any>,
	delay_duration?: FieldPolicy<any> | FieldReadFunction<any>,
	delayed_until?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	location_id?: FieldPolicy<any> | FieldReadFunction<any>,
	receipt_number?: FieldPolicy<any> | FieldReadFunction<any>,
	receipt_url?: FieldPolicy<any> | FieldReadFunction<any>,
	risk_level?: FieldPolicy<any> | FieldReadFunction<any>,
	source_type?: FieldPolicy<any> | FieldReadFunction<any>,
	square_product?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	total_mount?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	version_token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PollEntityKeySpecifier = ('closed' | 'created_at' | 'id' | 'options' | 'title' | 'updated_at' | 'voted' | PollEntityKeySpecifier)[];
export type PollEntityFieldPolicy = {
	closed?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	options?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	voted?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProfileEntityKeySpecifier = ('id' | 'profile_comments' | 'user' | ProfileEntityKeySpecifier)[];
export type ProfileEntityFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	profile_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('current_user' | 'fetch_all_applications' | 'fetch_all_orders' | 'fetch_all_reports' | 'fetch_all_threads' | 'fetch_application_by_short_name' | 'fetch_applications_by_owner_id' | 'fetch_comment_stats' | 'fetch_comments' | 'fetch_comments_by_application_id' | 'fetch_comments_by_application_short_name' | 'fetch_comments_by_thread_id' | 'fetch_notifications' | 'fetch_notifications_by_application_id' | 'fetch_notifications_by_short_name' | 'fetch_notifications_by_user_id' | 'fetch_threads_by_user_id' | 'fetch_users' | 'find_one_application_by_id' | 'find_one_application_by_name' | 'find_one_thread_or_create_one' | 'find_profile' | 'find_thread_by_id' | 'is_user_subscribed_to_thread' | 'resend_email_code' | 'search_user_by_email' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	current_user?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_all_applications?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_all_orders?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_all_reports?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_all_threads?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_application_by_short_name?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_applications_by_owner_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_comment_stats?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_comments_by_application_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_comments_by_application_short_name?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_comments_by_thread_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_notifications?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_notifications_by_application_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_notifications_by_short_name?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_notifications_by_user_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_threads_by_user_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fetch_users?: FieldPolicy<any> | FieldReadFunction<any>,
	find_one_application_by_id?: FieldPolicy<any> | FieldReadFunction<any>,
	find_one_application_by_name?: FieldPolicy<any> | FieldReadFunction<any>,
	find_one_thread_or_create_one?: FieldPolicy<any> | FieldReadFunction<any>,
	find_profile?: FieldPolicy<any> | FieldReadFunction<any>,
	find_thread_by_id?: FieldPolicy<any> | FieldReadFunction<any>,
	is_user_subscribed_to_thread?: FieldPolicy<any> | FieldReadFunction<any>,
	resend_email_code?: FieldPolicy<any> | FieldReadFunction<any>,
	search_user_by_email?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RatingModelKeySpecifier = ('author_id' | 'id' | RatingModelKeySpecifier)[];
export type RatingModelFieldPolicy = {
	author_id?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ReportModelKeySpecifier = ('created_at' | 'id' | 'reason' | 'updated_at' | 'user_id' | ReportModelKeySpecifier)[];
export type ReportModelFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	reason?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StandardResponseKeySpecifier = ('message' | 'success' | StandardResponseKeySpecifier)[];
export type StandardResponseFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StandardResponseModelKeySpecifier = ('message' | 'success' | StandardResponseModelKeySpecifier)[];
export type StandardResponseModelFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionEntityKeySpecifier = ('created_at' | 'id' | 'idempotency_key' | 'order_id' | 'renewal' | 'renewal_date' | 'updated_at' | SubscriptionEntityKeySpecifier)[];
export type SubscriptionEntityFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	idempotency_key?: FieldPolicy<any> | FieldReadFunction<any>,
	order_id?: FieldPolicy<any> | FieldReadFunction<any>,
	renewal?: FieldPolicy<any> | FieldReadFunction<any>,
	renewal_date?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ThreadModelKeySpecifier = ('application_id' | 'commenters_ids' | 'id' | 'parent_application' | 'pinned_comment' | 'pinned_comment_id' | 'poll' | 'subscribed_users' | 'subscribed_users_ids' | 'thread_comments' | 'thread_stats' | 'title' | 'website_url' | ThreadModelKeySpecifier)[];
export type ThreadModelFieldPolicy = {
	application_id?: FieldPolicy<any> | FieldReadFunction<any>,
	commenters_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	parent_application?: FieldPolicy<any> | FieldReadFunction<any>,
	pinned_comment?: FieldPolicy<any> | FieldReadFunction<any>,
	pinned_comment_id?: FieldPolicy<any> | FieldReadFunction<any>,
	poll?: FieldPolicy<any> | FieldReadFunction<any>,
	subscribed_users?: FieldPolicy<any> | FieldReadFunction<any>,
	subscribed_users_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	thread_comments?: FieldPolicy<any> | FieldReadFunction<any>,
	thread_stats?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	website_url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TwoFactorLoginResponseKeySpecifier = ('message' | 'success' | 'two_factor_authentication' | TwoFactorLoginResponseKeySpecifier)[];
export type TwoFactorLoginResponseFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	two_factor_authentication?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TwoFactorLoginSuccessResponseKeySpecifier = ('message' | 'refresh_token' | 'success' | 'token' | 'two_factor_authentication' | 'user' | TwoFactorLoginSuccessResponseKeySpecifier)[];
export type TwoFactorLoginSuccessResponseFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	refresh_token?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	two_factor_authentication?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserModelKeySpecifier = ('applications_joined_ids' | 'avatar' | 'blocked_users' | 'confirmed' | 'created_at' | 'email' | 'id' | 'last_active' | 'status' | 'two_factor_authentication' | 'updated_at' | 'user_role' | 'username' | UserModelKeySpecifier)[];
export type UserModelFieldPolicy = {
	applications_joined_ids?: FieldPolicy<any> | FieldReadFunction<any>,
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	blocked_users?: FieldPolicy<any> | FieldReadFunction<any>,
	confirmed?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	last_active?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	two_factor_authentication?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	user_role?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ViewEntityKeySpecifier = ('created_at' | 'id' | 'updated_at' | 'user_id' | 'view_count' | ViewEntityKeySpecifier)[];
export type ViewEntityFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>,
	view_count?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VoteEntityKeySpecifier = ('created_at' | 'id' | 'updated_at' | 'user_id' | VoteEntityKeySpecifier)[];
export type VoteEntityFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	user_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	ApplicationModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ApplicationModelKeySpecifier | (() => undefined | ApplicationModelKeySpecifier),
		fields?: ApplicationModelFieldPolicy,
	},
	AvatarEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AvatarEntityKeySpecifier | (() => undefined | AvatarEntityKeySpecifier),
		fields?: AvatarEntityFieldPolicy,
	},
	CardDetailEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CardDetailEntityKeySpecifier | (() => undefined | CardDetailEntityKeySpecifier),
		fields?: CardDetailEntityFieldPolicy,
	},
	CommentModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommentModelKeySpecifier | (() => undefined | CommentModelKeySpecifier),
		fields?: CommentModelFieldPolicy,
	},
	CommentStatsEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommentStatsEntityKeySpecifier | (() => undefined | CommentStatsEntityKeySpecifier),
		fields?: CommentStatsEntityFieldPolicy,
	},
	CommentsPerDay?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommentsPerDayKeySpecifier | (() => undefined | CommentsPerDayKeySpecifier),
		fields?: CommentsPerDayFieldPolicy,
	},
	CountModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CountModelKeySpecifier | (() => undefined | CountModelKeySpecifier),
		fields?: CountModelFieldPolicy,
	},
	FetchAllComments?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FetchAllCommentsKeySpecifier | (() => undefined | FetchAllCommentsKeySpecifier),
		fields?: FetchAllCommentsFieldPolicy,
	},
	FetchCommentByApplicationName?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FetchCommentByApplicationNameKeySpecifier | (() => undefined | FetchCommentByApplicationNameKeySpecifier),
		fields?: FetchCommentByApplicationNameFieldPolicy,
	},
	FetchCommentByThreadIdResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FetchCommentByThreadIdResponseKeySpecifier | (() => undefined | FetchCommentByThreadIdResponseKeySpecifier),
		fields?: FetchCommentByThreadIdResponseFieldPolicy,
	},
	FetchCommentsByApplicationId?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FetchCommentsByApplicationIdKeySpecifier | (() => undefined | FetchCommentsByApplicationIdKeySpecifier),
		fields?: FetchCommentsByApplicationIdFieldPolicy,
	},
	LoginResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoginResponseKeySpecifier | (() => undefined | LoginResponseKeySpecifier),
		fields?: LoginResponseFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	NotificationEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationEntityKeySpecifier | (() => undefined | NotificationEntityKeySpecifier),
		fields?: NotificationEntityFieldPolicy,
	},
	OptionEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OptionEntityKeySpecifier | (() => undefined | OptionEntityKeySpecifier),
		fields?: OptionEntityFieldPolicy,
	},
	OrderEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderEntityKeySpecifier | (() => undefined | OrderEntityKeySpecifier),
		fields?: OrderEntityFieldPolicy,
	},
	PaymentEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentEntityKeySpecifier | (() => undefined | PaymentEntityKeySpecifier),
		fields?: PaymentEntityFieldPolicy,
	},
	PollEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PollEntityKeySpecifier | (() => undefined | PollEntityKeySpecifier),
		fields?: PollEntityFieldPolicy,
	},
	ProfileEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProfileEntityKeySpecifier | (() => undefined | ProfileEntityKeySpecifier),
		fields?: ProfileEntityFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	RatingModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RatingModelKeySpecifier | (() => undefined | RatingModelKeySpecifier),
		fields?: RatingModelFieldPolicy,
	},
	ReportModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ReportModelKeySpecifier | (() => undefined | ReportModelKeySpecifier),
		fields?: ReportModelFieldPolicy,
	},
	StandardResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StandardResponseKeySpecifier | (() => undefined | StandardResponseKeySpecifier),
		fields?: StandardResponseFieldPolicy,
	},
	StandardResponseModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StandardResponseModelKeySpecifier | (() => undefined | StandardResponseModelKeySpecifier),
		fields?: StandardResponseModelFieldPolicy,
	},
	SubscriptionEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionEntityKeySpecifier | (() => undefined | SubscriptionEntityKeySpecifier),
		fields?: SubscriptionEntityFieldPolicy,
	},
	ThreadModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ThreadModelKeySpecifier | (() => undefined | ThreadModelKeySpecifier),
		fields?: ThreadModelFieldPolicy,
	},
	TwoFactorLoginResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TwoFactorLoginResponseKeySpecifier | (() => undefined | TwoFactorLoginResponseKeySpecifier),
		fields?: TwoFactorLoginResponseFieldPolicy,
	},
	TwoFactorLoginSuccessResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TwoFactorLoginSuccessResponseKeySpecifier | (() => undefined | TwoFactorLoginSuccessResponseKeySpecifier),
		fields?: TwoFactorLoginSuccessResponseFieldPolicy,
	},
	UserModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserModelKeySpecifier | (() => undefined | UserModelKeySpecifier),
		fields?: UserModelFieldPolicy,
	},
	ViewEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ViewEntityKeySpecifier | (() => undefined | ViewEntityKeySpecifier),
		fields?: ViewEntityFieldPolicy,
	},
	VoteEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VoteEntityKeySpecifier | (() => undefined | VoteEntityKeySpecifier),
		fields?: VoteEntityFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;